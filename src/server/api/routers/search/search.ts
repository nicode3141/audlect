import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, count, desc, eq, exists, ilike, or, sql } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import type { DeezerSearchResult } from "~/types/songs";
import { searchTrack } from "~/server/utils/deezer";
import { likesTable, songsTable, votingsTable } from "~/server/db/schema";

import { decodeCursor, encodeCursor, buildTopSongSubquery, buildCursorCondition, buildOrderBy } from "../votingHelpers";

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
				limit: z.number().min(1).max(100),
				offset: z.number().min(0),
				voting_id: z.uuid(),
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
				cursor: z.string().nullish(),
				sort_method: z.enum(["date", "popularity", "a-z"]).default("date"),
			}),
		)
		.query(async ({ ctx, input }) => {
			const cursor = decodeCursor(input.cursor);
			const topSong = buildTopSongSubquery(ctx.db);

			let cursorCondition;

			if (cursor) {
				if (cursor.sort !== input.sort_method) {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Cursor does not match sort method",
					});
				}

				cursorCondition = buildCursorCondition(cursor, topSong);
			}

			const orderBy = buildOrderBy(input.sort_method, topSong);

			try {
				const rows = await ctx.db
					.select({
						voting_id: votingsTable.voting_id,
						short_id: votingsTable.short_id,
						name: votingsTable.name,
						description: votingsTable.description,
						external_url: votingsTable.external_url,
						created_by: votingsTable.created_by,
						public: votingsTable.public,
						active: votingsTable.active,
						created_at: votingsTable.created_at,

						preview_image: topSong.preview_image,
						popularity: topSong.popularity,
					})
					.from(votingsTable)
					.leftJoin(topSong, eq(votingsTable.voting_id, topSong.voting_id))
					.where(
						and(eq(votingsTable.public, true), ilike(votingsTable.name, `%${input.search_string}%`), cursorCondition),
					)
					.orderBy(...orderBy)
					.limit(input.limit + 1);

				if (!rows) {
					throw new TRPCError({
						code: "INTERNAL_SERVER_ERROR",
						message: "Failed to retrieve votings",
					});
				}

				const hasNextPage = rows.length > input.limit;
				const votings = hasNextPage ? rows.slice(0, input.limit) : rows;

				let nextCursor: string | null = null;

				if (hasNextPage) {
					const last = votings[votings.length - 1];

					if (!last) {
						throw new TRPCError({
							code: "INTERNAL_SERVER_ERROR",
							message: "Failed to create pagination cursor",
						});
					}

					switch (input.sort_method) {
						case "date":
							nextCursor = encodeCursor({
								sort: "date",
								createdAt: last.created_at?.toISOString() ?? "",
								votingId: last.voting_id,
							});
							break;

						case "a-z":
							nextCursor = encodeCursor({
								sort: "a-z",
								name: last.name,
								votingId: last.voting_id,
							});
							break;

						case "popularity":
							if (last.popularity !== null) {
								nextCursor = encodeCursor({
									sort: "popularity",
									popularity: last.popularity,
									votingId: last.voting_id,
								});
							}
							break;
					}
				}

				return {
					items: votings,
					nextCursor,
				};
			} catch (err: unknown) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: err instanceof Error ? err.message : "couldn't fetch songs",
				});
			}
		}),
});
