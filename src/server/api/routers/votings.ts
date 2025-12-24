import { eq } from "drizzle-orm";
import { z } from "zod";
import { nanoid } from "nanoid";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { voting_membershipsTable, votingsTable } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";

export const votingsRouter = createTRPCRouter({
	/**
	 * GET votings by ID (UUID)
	 *
	 * voting: voting_id, name, description, created_by, public, active, created_at
	 */
	votings: publicProcedure
		.input(
			z.object({
				voting_id: z.string().uuid(),
			}),
		)
		.query(async ({ ctx, input }) => {
			//SELECT * FROM votings WHERE voting_id = 798327357943;
			const votings = await ctx.db
				.select()
				.from(votingsTable)
				.where(eq(votingsTable.voting_id, input.voting_id))
				.limit(1);
			const name = votings[0]?.name;

			console.log(name);

			return votings[0];
		}),

	joinVoting: protectedProcedure
		.input(
			z.object({
				voting_id: z.string().uuid(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				if (
					ctx.auth.user.votingMemberships.find((membership) => membership.votingId === input.voting_id) === undefined
				) {
					const [membership] = await ctx.db
						.insert(voting_membershipsTable)
						.values({ voting_id: input.voting_id, user_id: ctx.auth.session.userId, role: "participant" })
						.returning();

					return membership;
				}
			} catch (err: unknown) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: err instanceof Error ? err.message : "couldn't fetch songs",
				});
			}
		}),

	createVoting: protectedProcedure
		.input(
			z.object({
				name: z.string().min(3).max(100),
				description: z.string().max(255),
				public: z.boolean().default(false),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const newVoting = await ctx.db
					.insert(votingsTable)
					.values({
						name: input.name,
						description: input.description,
						public: input.public,
						created_by: ctx.auth.session.userId,
						active: true,
						short_id: nanoid(10),
					})
					.returning();

				if (newVoting.length !== 0 && newVoting[0]?.voting_id !== undefined) {
					const newRole = await ctx.db.insert(voting_membershipsTable).values({
						user_id: ctx.auth.session.userId,
						voting_id: newVoting[0]?.voting_id,
						role: "owner",
					});
				}

				return newVoting[0];
			} catch (err: unknown) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: err instanceof Error ? err.message : "couldn't fetch songs",
				});
			}
		}),
});
