import { and, asc, count, desc, eq, max } from "drizzle-orm";
import { z } from "zod";
import { nanoid } from "nanoid";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

import { voting_membershipsTable, likesTable, songsTable, votingsTable } from "~/server/db/schema";

import { TRPCError } from "@trpc/server";

export const votingsRouter = createTRPCRouter({
	getPublicVotings: publicProcedure
		.input(
			z.object({
				limit: z.number().default(10),
				page: z.number().default(0),
				sort_method: z.enum(["Date Added", "Users", "A-Z"]).default("Date Added"),
			}),
		)
		.query(async ({ ctx, input }) => {
			let sortQuery;
			switch (input.sort_method) {
				default:
					sortQuery = votingsTable.created_at;
					break;
				case "A-Z":
					sortQuery = asc(votingsTable.name);
					break;
			}

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
					.where(eq(votingsTable.public, true))
					.orderBy(votingsTable.voting_id, desc(sortQuery))
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

	getOwnVotings: protectedProcedure
		.input(
			z.object({
				limit: z.number().default(10),
				page: z.number().default(0),
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

	/**
	 * GET votings by ID (UUID)
	 *
	 * voting: voting_id, name, description, created_by, public, active, created_at
	 */
	votings: publicProcedure
		.input(
			z.object({
				voting_id: z.uuid(),
			}),
		)
		.query(async ({ ctx, input }) => {
			//SELECT * FROM votings WHERE voting_id = 798327357943;
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

	createVoting: protectedProcedure
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

	deleteVoting: protectedProcedure
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
