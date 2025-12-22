import { TRPCError } from "@trpc/server";
import { and, count, eq, exists, sql } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { likesTable, songsTable } from "~/server/db/schema";

export const likesRouter = createTRPCRouter({
	/**
	 * POST like (AUTH)
	 *
	 * @param song_id uuid
	 * @param voting_id uuid
	 *
	 * @return track
	 */
	like: protectedProcedure
		.input(
			z.object({
				song_id: z.string().uuid(),
				voting_id: z.string().uuid(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const result = await ctx.db
					.insert(likesTable)
					.values({
						song_id: input.song_id,
						voting_id: input.voting_id,
						user_id: ctx.auth.session.userId,
					})
					.onConflictDoNothing()
					.returning();

				if (result.length > 0) {
					const [song] = await ctx.db
						.select({
							song_id: songsTable.song_id,
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
						.where(and(eq(songsTable.voting_id, input.voting_id), eq(songsTable.song_id, input.song_id)))
						.groupBy(songsTable.song_id)
						.limit(1);

					return song;
				} else {
					throw new TRPCError({
						code: "BAD_GATEWAY",
						message: "Error whilst liking song",
					});
				}
			} catch (err) {
				if (err instanceof Error)
					throw new TRPCError({
						code: "INTERNAL_SERVER_ERROR",
						message: err.message,
					});

				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Couldn't like song",
				});
			}
		}),

	/**
	 * POST unlike (AUTH)
	 *
	 * @param song_id uuid
	 * @param voting_id uuid
	 *
	 * @return track
	 */
	unlike: protectedProcedure
		.input(
			z.object({
				song_id: z.string().uuid(),
				voting_id: z.string().uuid(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const result = await ctx.db
					.delete(likesTable)
					.where(
						and(
							eq(likesTable.song_id, input.song_id),
							eq(likesTable.user_id, ctx.auth?.session?.userId),
							eq(likesTable.voting_id, input.voting_id),
						),
					)
					.returning();

				if (result.length > 0) {
					const [song] = await ctx.db
						.select({
							song_id: songsTable.song_id,
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
						.where(and(eq(songsTable.voting_id, input.voting_id), eq(songsTable.song_id, input.song_id)))
						.groupBy(songsTable.song_id)
						.limit(1);

					return song;
				} else {
					throw new TRPCError({
						code: "BAD_GATEWAY",
						message: "Error whilst unliking song",
					});
				}
			} catch (err) {
				if (err instanceof Error)
					throw new TRPCError({
						code: "INTERNAL_SERVER_ERROR",
						message: err.message,
					});

				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Error whilst unliking song",
				});
			}
		}),
});
