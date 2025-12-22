import { TRPCError } from "@trpc/server";
import { and, asc, count, desc, eq, exists, sql } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { likesTable, songsTable } from "~/server/db/schema";
import type { DeezerTrack } from "~/types/songs";
import { getTrack } from "~/server/utils/deezer";

export const songsRouter = createTRPCRouter({
	/**
	 * GET all songs
	 *
	 * @param limit number
	 * @param offset number
	 * @param sort_method union ( likes | Least Likes | Date Added | A-Z )
	 * @param voting_id UUID
	 *
	 * @return songs:
	 */
	songs: publicProcedure
		.input(
			z.object({
				limit: z.number(),
				offset: z.number(),
				sort_method: z.string(),
				voting_id: z.string().uuid(),
			}),
		)
		.query(async ({ ctx, input }) => {
			let sortQuery;
			switch (input.sort_method) {
				default:
					sortQuery = desc(sql`likes_total`);
					break;
				case "Least Likes":
					sortQuery = asc(sql`likes_total`);
					break;
				case "Date Added":
					sortQuery = asc(songsTable.created_at);
					break;
				case "Random":
					sortQuery = asc(sql`RANDOM()`);
					break;
				case "A-Z":
					sortQuery = asc(songsTable.song_name);
					break;
			}
			try {
				/**
				 * SQL:
				 * let songsQuery = `SELECT *, (SELECT COUNT(*) FROM Likes WHERE song_uid = Songs.song_uid)
				 *      AS likes_total FROM Songs ${sortQuery} LIMIT ${input.limit} OFFSET ${input.offset}`
				 */

				const query = ctx.db
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
					.where(eq(songsTable.voting_id, input.voting_id))
					.groupBy(songsTable.song_id)
					.orderBy(sortQuery)
					.limit(input.limit)
					.offset(input.offset);

				const songQuery = await query;
				return songQuery;
			} catch (err: unknown) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: err instanceof Error ? err.message : "couldn't fetch songs",
				});
			}
		}),

	/**
	 * GET total entries
	 *
	 * @param voting_id uuid
	 *
	 * @return count: rows
	 */

	entriesTotal: publicProcedure
		.input(
			z.object({
				voting_id: z.string().uuid(),
			}),
		)
		.query(async ({ ctx, input }) => {
			try {
				const [rows] = await ctx.db
					.select({ count: count().as("count") })
					.from(songsTable)
					.where(eq(songsTable.voting_id, input.voting_id));
				return rows;
			} catch (err) {
				if (err instanceof Error)
					throw new TRPCError({
						code: "INTERNAL_SERVER_ERROR",
						message: err.message,
					});

				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Something went wrong",
				});
			}
		}),

	/**
	 * POST song to voting (AUTH)
	 *
	 * fetches metadata from spotify
	 *
	 * @param voting_id UUID
	 * @param id string
	 * @param added_by string
	 *
	 * @return track:
	 */

	addSongID: protectedProcedure
		.input(
			z.object({
				voting_id: z.string().uuid(),
				id: z.number(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				//deezer API fetch metadata
				const item: DeezerTrack | undefined = await getTrack(input.id.toString());

				if (item === undefined) {
					console.warn("Invalid deezer id");
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Invalid deezer id",
					});
				}

				try {
					//BUG: same song but different voting_id gets rejected
					const [result] = await ctx.db
						.insert(songsTable)
						.values({
							deezer_id: item.id,
							isrc: item.isrc,
							voting_id: input.voting_id,
							cover_image: item.album.cover,
							song_name: item.title,
							song_artists: item.artist.name,
							preview_url: null,
							added_by: ctx.auth?.session?.userId,
						})
						.returning();

					return result;
				} catch (err) {
					if (err instanceof Error && err.message.includes("duplicate key")) {
						throw new TRPCError({
							code: "CONFLICT",
							message: "Song already added, " + err.message,
						});
					}

					if (err instanceof Error) {
						throw new TRPCError({
							code: "INTERNAL_SERVER_ERROR",
							message: err.message,
						});
					}
				}
			} catch (err) {
				if (err instanceof TRPCError) throw err;

				if (err instanceof Error) {
					throw new TRPCError({
						code: "INTERNAL_SERVER_ERROR",
						message: err.message,
					});
				}

				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to add song",
				});
			}
		}),

	/**
	 * DELETE song to voting (AUTH)
	 *
	 * @param voting_id uuid
	 * @param song_id uuid
	 *
	 * @return track:
	 */

	deleteSong: protectedProcedure
		.input(
			z.object({
				voting_id: z.string().uuid(),
				song_id: z.string().uuid(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const [result] = await ctx.db
					.delete(songsTable)
					.where(
						and(
							eq(songsTable.song_id, input.song_id),
							eq(songsTable.added_by, ctx.auth?.session?.userId),
							eq(songsTable.voting_id, input.voting_id),
						),
					)
					.returning({ song_id: songsTable.song_id });

				if (result === undefined) {
					throw new TRPCError({
						code: "INTERNAL_SERVER_ERROR",
						message: "Failed to delete song",
					});
				}

				return result;
			} catch (err) {
				if (err instanceof Error) {
					throw new TRPCError({
						code: "BAD_GATEWAY",
						message: err.message,
					});
				}

				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to delete song",
				});
			}
		}),
});
