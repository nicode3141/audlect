import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import type { DeezerSearchResult } from "~/types/songs";
import { searchTrack } from "~/server/utils/deezer";
import { likesTable, songsTable, votingsTable } from "~/server/db/schema";
import { and, count, desc, eq, exists, ilike, max, or, sql } from "drizzle-orm";

export const searchRouter = createTRPCRouter({
	/**
	 * @brief search tracks by string
	 *
	 * @param search_string
	 * @param limit number
	 * @param offset number
	 * @param voting_id string (uuid)
	 *
	 * @return items
	 *
	 */
	fullSearch: protectedProcedure
		.input(
			z.object({
				search_string: z.string(),
				limit: z.number(),
				offset: z.number(),
				voting_id: z.string().uuid(),
			}),
		)
		.query(async ({ ctx, input }) => {
			try {
				const added_items = await ctx.db
					.select({
						song_id: songsTable.song_id,
						deezer_id: songsTable.deezer_id,
						isrc: songsTable.isrc,
						voting_id: songsTable.voting_id,
						song_name: songsTable.song_name,
						song_artists: songsTable.song_artists,
						cover_image: songsTable.cover_image,
						preview_url: songsTable.preview_url,
						added_by: songsTable.added_by,
						created_at: songsTable.created_at,
						likes_total: count(likesTable.song_id).as("likes_total"),
						liked: ctx.auth?.session?.userId
							? exists(
									ctx.db
										.select({ one: sql`1` })
										.from(likesTable)
										.where(
											and(
												eq(likesTable.song_id, songsTable.song_id),
												eq(likesTable.user_id, ctx.auth?.session?.userId),
											),
										),
								).as("liked")
							: sql`false`.as("liked"),
					})
					.from(songsTable)
					.leftJoin(likesTable, eq(likesTable.song_id, songsTable.song_id))
					.where(
						and(
							eq(songsTable.voting_id, input.voting_id),
							or(
								ilike(songsTable.song_name, `%${input.search_string}%`),
								ilike(songsTable.song_artists, `%${input.search_string}%`),
							),
						),
					)
					.groupBy(songsTable.song_id)
					.offset(input.offset);

				const deezer_items: DeezerSearchResult | undefined = await searchTrack(
					input.search_string,
					input.limit,
					input.offset + added_items?.length,
				);

				const added_song_ids = new Set(added_items.map((item) => item.deezer_id));
				const filtered_deezer_items = deezer_items?.data
					.filter((item) => !added_song_ids.has(item.id))
					.map((item) => ({
						deezer_id: item.id,
						song_name: item.title,
						song_artists: item.artist.name,
						cover_image: item.album.cover,
						preview_url: item.preview,
					}));

				return {
					added_items,
					deezer_items: filtered_deezer_items,
				};
			} catch (err) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: err instanceof Error ? err.message : "couldn't fetch songs",
				});
			}
		}),

	searchPublicVotings: publicProcedure
		.input(
			z.object({
				search_string: z.string(),
				limit: z.number().min(0).max(200).default(10),
				page: z.number().min(0).default(0),
			}),
		)
		.query(async ({ ctx, input }) => {
			try {
				const imageSubquery = ctx.db
					.select({
						preview_image: songsTable.cover_image,
						voting_id: songsTable.voting_id,
						like_count: count(likesTable.song_id).as("like_count"),
					})
					.from(songsTable)
					.leftJoin(likesTable, eq(likesTable.song_id, songsTable.song_id))
					.groupBy(songsTable.song_id)
					.orderBy(desc(count(likesTable.song_id)))
					.as("imageSubquery");

				const maxLikes = ctx.db
					.select({
						voting_id: imageSubquery.voting_id,
						max_likes: max(imageSubquery.like_count).as("max_likes"),
					})
					.from(imageSubquery)
					.groupBy(imageSubquery.voting_id)
					.as("maxLikes");

				const votings = await ctx.db
					.selectDistinctOn([votingsTable.voting_id], {
						voting_id: votingsTable.voting_id,
						short_id: votingsTable.short_id,
						name: votingsTable.name,
						description: votingsTable.description,
						external_url_: votingsTable.external_url,
						created_by: votingsTable.created_by,
						public: votingsTable.public,
						active: votingsTable.active,
						created_at: votingsTable.created_at,
						preview_image: imageSubquery.preview_image,
					})
					.from(votingsTable)
					.leftJoin(maxLikes, eq(votingsTable.voting_id, maxLikes.voting_id))
					.leftJoin(
						imageSubquery,
						and(eq(votingsTable.voting_id, imageSubquery.voting_id), eq(imageSubquery.like_count, maxLikes.max_likes)),
					)
					.where(and(eq(votingsTable.public, true), ilike(votingsTable.name, `%${input.search_string}%`)))
					.orderBy(votingsTable.voting_id, desc(votingsTable.name))
					.limit(input.limit)
					.offset(input.page * input.limit);

				return votings;
			} catch (err: unknown) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: err instanceof Error ? err.message : "couldn't fetch songs",
				});
			}
		}),
});
