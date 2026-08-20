import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { nanoid } from "nanoid";

import { createTRPCRouter, protectedProcedure, publicProcedure, rateLimitedProcedure } from "~/server/api/trpc";

import { voting_membershipsTable, votingsTable } from "~/server/db/schema";

import { TRPCError } from "@trpc/server";

import { decodeCursor, encodeCursor, buildTopSongSubquery, buildCursorCondition, buildOrderBy } from "./votingHelpers";

export const votingsRouter = createTRPCRouter({
	getPublicVotings: publicProcedure
		.input(
			z.object({
				limit: z.number().min(0).max(200).default(10),
				page: z.number().min(0).default(0),
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

						preview_image: topSong.preview_image, //external
						popularity: topSong.popularity, //external
					})
					.from(votingsTable)
					.leftJoin(topSong, eq(votingsTable.voting_id, topSong.voting_id))
					.where(and(eq(votingsTable.public, true), cursorCondition))
					.orderBy(...orderBy)
					.limit(input.limit + 1);

				const hasNextPage = rows.length > input.limit;
				const votings = hasNextPage ? rows.slice(0, input.limit) : rows;

				let nextCursor: string | null = null;

				if (hasNextPage) {
					const last = votings[votings.length - 1]; //last voting

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

	getOwnVotings: protectedProcedure
		.input(
			z.object({
				limit: z.number().min(0).max(200).default(10),
				page: z.number().min(0).default(0),
			}),
		)
		.query(async ({ ctx, input }) => {
			try {
				const votings = await ctx.db
					.select()
					.from(votingsTable)
					.where(eq(votingsTable.created_by, ctx.auth.session.userId))
					.orderBy(desc(votingsTable.created_at))
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

	votings: publicProcedure
		.input(
			z.object({
				voting_id: z.uuid(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const votings = await ctx.db
				.select()
				.from(votingsTable)
				.where(eq(votingsTable.voting_id, input.voting_id))
				.limit(1);

			return votings[0];
		}),

	getMyMembership: protectedProcedure.input(z.object({ voting_id: z.uuid() })).query(async ({ ctx, input }) => {
		const [membership] = await ctx.db
			.select({ role: voting_membershipsTable.role })
			.from(voting_membershipsTable)
			.where(
				and(
					eq(voting_membershipsTable.user_id, ctx.auth.session.userId),
					eq(voting_membershipsTable.voting_id, input.voting_id),
				),
			);
		return membership ?? null;
	}),

	joinVoting: protectedProcedure.input(z.object({ voting_id: z.uuid() })).mutation(async ({ ctx, input }) => {
		const [membership] = await ctx.db
			.insert(voting_membershipsTable)
			.values({
				voting_id: input.voting_id,
				user_id: ctx.auth.session.userId,
				role: "participant",
			})
			.onConflictDoNothing()
			.returning();
		return membership ?? null;
	}),

	createVoting: rateLimitedProcedure(5, 60_000)
		.input(
			z.object({
				name: z.string().min(3).max(100),
				description: z.string().max(255).nullable(),
				public: z.boolean().default(false),
				starts_at: z.date().nullable(),
				ends_at: z.date().nullable(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				if (input.starts_at && input.ends_at && input.starts_at >= input.ends_at) {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Start time must be before end time",
					});
				}

				const newVoting = await ctx.db
					.insert(votingsTable)
					.values({
						name: input.name,
						description: input.description ?? "",
						public: input.public,
						created_by: ctx.auth.session.userId,
						active: true,
						short_id: nanoid(10),
						starts_at: input.starts_at ?? null,
						ends_at: input.ends_at ?? null,
					})
					.returning();

				if (newVoting.length !== 0 && newVoting[0]?.voting_id !== undefined) {
					const newRole = await ctx.db
						.insert(voting_membershipsTable)
						.values({
							user_id: ctx.auth.session.userId,
							voting_id: newVoting[0]?.voting_id,
							role: "owner",
						})
						.returning();

					if (newRole.length === 0) {
						throw new TRPCError({
							code: "INTERNAL_SERVER_ERROR",
							message: "Failed to assign role to voting creator",
						});
					}
				}

				return newVoting[0];
			} catch (err: unknown) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: err instanceof Error ? err.message : "couldn't fetch songs",
				});
			}
		}),

	deleteVoting: rateLimitedProcedure(3, 60_000)
		.input(
			z.object({
				voting_id: z.uuid(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const deletedVoting = await ctx.db
					.delete(votingsTable)
					.where(and(eq(votingsTable.voting_id, input.voting_id), eq(votingsTable.created_by, ctx.auth.session.userId)))
					.returning();

				return deletedVoting[0];
			} catch (err: unknown) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: err instanceof Error ? err.message : "couldn't delete voting",
				});
			}
		}),
});
