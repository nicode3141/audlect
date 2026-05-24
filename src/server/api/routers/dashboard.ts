import { and, count, countDistinct, eq } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { votingsTable, voting_membershipsTable, songsTable, likesTable } from "~/server/db/schema";
import type { db } from "~/server/db";

type Database = typeof db;

async function resolveVotingId(database: Database, shortId: string) {
	const voting = await database
		.select({ voting_id: votingsTable.voting_id })
		.from(votingsTable)
		.where(eq(votingsTable.short_id, shortId))
		.limit(1);

	return voting[0]?.voting_id;
}

export const dashboardRouter = createTRPCRouter({
	getSettings: protectedProcedure.input(z.object({ short_id: z.string().max(16) })).query(async ({ ctx, input }) => {
		try {
			const voting = await ctx.db.select().from(votingsTable).where(eq(votingsTable.short_id, input.short_id)).limit(1);

			return voting[0] ?? null;
		} catch (err: unknown) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: err instanceof Error ? err.message : "Failed to fetch settings",
			});
		}
	}),

	updateSettings: protectedProcedure
		.input(
			z.object({
				short_id: z.string().max(16),
				name: z.string().min(3).max(100).optional(),
				description: z.string().max(255).optional(),
				public: z.boolean().optional(),
				starts_at: z.date().nullable().optional(),
				ends_at: z.date().nullable().optional(),
				max_votes_user: z.number().int().min(1).nullable().optional(),
				max_songs_user: z.number().int().min(1).nullable().optional(),
				max_votes_del: z.number().int().min(0).nullable().optional(),
				song_approval: z.boolean().optional(),
				filter_inappropiate: z.boolean().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const voting_id = await resolveVotingId(ctx.db, input.short_id);
				if (!voting_id) {
					throw new TRPCError({ code: "NOT_FOUND", message: "Voting not found" });
				}

				const { short_id, ...settings } = input;
				const cleanedSettings = Object.fromEntries(
					Object.entries(settings).filter(([_, v]) => v !== undefined),
				) as typeof settings;

				const membership = await ctx.db
					.select()
					.from(voting_membershipsTable)
					.where(
						and(
							eq(voting_membershipsTable.voting_id, voting_id),
							eq(voting_membershipsTable.user_id, ctx.auth.session.userId),
						),
					)
					.limit(1);

				if (!membership[0] || membership[0].role === "participant") {
					throw new TRPCError({ code: "FORBIDDEN", message: "Only owners and moderators can update settings" });
				}

				const [updated] = await ctx.db
					.update(votingsTable)
					.set(cleanedSettings)
					.where(eq(votingsTable.voting_id, voting_id))
					.returning();

				if (!updated) {
					throw new TRPCError({ code: "NOT_FOUND", message: "Voting not found" });
				}

				return updated;
			} catch (err: unknown) {
				if (err instanceof TRPCError) throw err;
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: err instanceof Error ? err.message : "Failed to update settings",
				});
			}
		}),

	getAnalytics: protectedProcedure.input(z.object({ short_id: z.string().max(16) })).query(async ({ ctx, input }) => {
		try {
			const voting_id = await resolveVotingId(ctx.db, input.short_id);
			if (!voting_id) {
				throw new TRPCError({ code: "NOT_FOUND", message: "Voting not found" });
			}

			const totalSongs = await ctx.db
				.select({ count: count() })
				.from(songsTable)
				.where(eq(songsTable.voting_id, voting_id))
				.limit(1);

			const totalLikes = await ctx.db
				.select({ count: count() })
				.from(likesTable)
				.where(eq(likesTable.voting_id, voting_id))
				.limit(1);

			const participants = await ctx.db
				.select({ count: countDistinct(likesTable.user_id) })
				.from(likesTable)
				.where(eq(likesTable.voting_id, voting_id))
				.limit(1);

			return {
				totalSongs: totalSongs[0]?.count ?? 0,
				totalLikes: totalLikes[0]?.count ?? 0,
				participants: participants[0]?.count ?? 0,
			};
		} catch (err: unknown) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: err instanceof Error ? err.message : "Failed to fetch analytics",
			});
		}
	}),
});
