import { TRPCError } from "@trpc/server";
import { and, asc, count, desc, eq, exists, gt, gte, lt, lte, or, sql, type SQL } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { likesTable, songsTable, voting_membershipsTable } from "~/server/db/schema";
import type { DeezerTrack, NextCursor } from "~/types/songs";
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
				cursor: z.string().nullish(), //infiniteQuery param
				sort_method: z.string(),
				voting_id: z.string().uuid(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const subquery = ctx.db
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
					rank: sql<number>`RANK() OVER (ORDER BY COUNT(${likesTable.song_id}) DESC, ${songsTable.created_at})`.as(
						"rank",
					),
					created_at: sql<string>`to_char(${songsTable.created_at}, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')`.as("created_at"),
					likes_total: count(likesTable.song_id).as("likes_total"),
				})
				.from(songsTable)
				.leftJoin(likesTable, eq(likesTable.song_id, songsTable.song_id))
				.where(eq(songsTable.voting_id, input.voting_id))
				.groupBy(songsTable.song_id)
				.as("sub_songs");

			const cursor: NextCursor | null = input.cursor
				? (() => {
						const parsed = JSON.parse(input.cursor) as NextCursor;
						return {
							...parsed,
							created_at: new Date(parsed.created_at),
						};
					})()
				: null;

			console.log(cursor);

			let sortQuery;
			let whereQuery: SQL<unknown> | undefined = eq(subquery.voting_id, input.voting_id);
			switch (input.sort_method) {
				default:
					sortQuery = desc(sql`likes_total`);
					if (cursor?.likes_total !== undefined || cursor?.created_at !== undefined) {
						whereQuery = and(
							or(
								lt(subquery.likes_total, cursor.likes_total),
								and(
									eq(subquery.likes_total, cursor.likes_total),
									or(
										gt(subquery.created_at, sql`${cursor.created_at.toISOString()}`),
										and(
											eq(subquery.created_at, sql`${cursor.created_at.toISOString()}`),
											gt(subquery.deezer_id, cursor.deezer_id),
										),
									),
								),
							),
						);
					}
					break;
				case "Least Likes":
					sortQuery = asc(sql`likes_total`);
					if (cursor?.likes_total !== undefined || cursor?.created_at !== undefined) {
						whereQuery = or(
							gt(subquery.likes_total, cursor.likes_total),
							and(
								eq(subquery.likes_total, cursor.likes_total),
								or(
									gt(subquery.created_at, sql`${cursor.created_at.toISOString()}`),
									and(
										eq(subquery.created_at, sql`${cursor.created_at.toISOString()}`),
										gt(subquery.deezer_id, cursor.deezer_id),
									),
								),
							),
						);
					}
					break;
				case "Date Added":
					sortQuery = asc(subquery.created_at);
					if (cursor?.created_at !== undefined) {
						whereQuery = gt(subquery.created_at, sql`${cursor.created_at.toISOString()}`);
					}
					break;
				case "Random":
					sortQuery = asc(subquery.song_id);
					if (cursor?.deezer_id !== undefined) {
						whereQuery = gt(subquery.song_id, cursor.song_id);
					}
					break;
				case "A-Z":
					sortQuery = asc(subquery.song_name);
					if (cursor?.song_name !== undefined || cursor?.created_at !== undefined) {
						whereQuery = or(
							gt(subquery.song_name, cursor.song_name),
							and(
								eq(subquery.song_name, cursor.song_name),
								gt(subquery.created_at, sql`${cursor.created_at.toISOString()}`),
							),
						);
					}
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
						song_id: subquery.song_id,
						deezer_id: subquery.deezer_id,
						isrc: subquery.isrc,
						voting_id: subquery.voting_id,
						song_name: subquery.song_name,
						song_artists: subquery.song_artists,
						cover_image: subquery.cover_image,
						preview_url: subquery.preview_url,
						added_by: subquery.added_by,
						rank: subquery.rank,
						created_at: subquery.created_at,
						likes_total: subquery.likes_total,
						liked: ctx.auth?.session?.userId
							? exists(
									ctx.db
										.select({ one: sql`1` })
										.from(likesTable)
										.where(
											and(eq(likesTable.song_id, subquery.song_id), eq(likesTable.user_id, ctx.auth?.session?.userId)),
										),
								).as("liked")
							: sql`false`.as("liked"),
					})
					.from(subquery)
					.where(whereQuery)

					.orderBy(sortQuery, asc(subquery.created_at), asc(subquery.deezer_id))
					.limit(input.limit + 1);

				const songQuery = await query;

				let nextCursor: typeof input.cursor | undefined = undefined;

				if (songQuery.length > input.limit) {
					nextCursor = JSON.stringify({
						deezer_id: songQuery[input.limit]?.deezer_id,
						song_id: songQuery[input.limit]?.song_id,
						likes_total: songQuery[input.limit]?.likes_total,
						created_at: songQuery[input.limit]?.created_at,
						song_name: songQuery[input.limit]?.song_name,
					});
					songQuery.pop();
				}

				return { items: songQuery, nextCursor };
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
					const [result] = await ctx.db
						.insert(songsTable)
						.values({
							deezer_id: item.id,
							isrc: item.isrc,
							voting_id: input.voting_id,
							cover_image: item.album.cover_medium,
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
				const [memberships] = await ctx.db
					.select()
					.from(voting_membershipsTable)
					.where(
						and(
							eq(voting_membershipsTable.user_id, ctx.auth.session.userId),
							eq(voting_membershipsTable.voting_id, input.voting_id),
						),
					);

				if ((memberships?.role !== "owner" && memberships?.role !== "moderator") || !memberships) {
					const [result] = await ctx.db
						.delete(songsTable)
						.where(
							and(
								eq(songsTable.song_id, input.song_id),
								eq(songsTable.voting_id, input.voting_id),
								eq(songsTable.added_by, ctx.auth.session.userId),
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
				}

				const [result] = await ctx.db
					.delete(songsTable)
					.where(and(eq(songsTable.song_id, input.song_id), eq(songsTable.voting_id, input.voting_id)))
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
