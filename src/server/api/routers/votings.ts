import { eq } from "drizzle-orm";
import { z } from "zod";
import { nanoid } from "nanoid";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { votingsTable } from "~/server/db/schema";

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

	createVoting: protectedProcedure
		.input(
			z.object({
				name: z.string().min(3).max(100),
				description: z.string().max(255),
				public: z.boolean().default(false),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const newVoting = await ctx.db
				.insert(votingsTable)
				.values({
					name: input.name,
					description: input.description,
					public: input.public,
					created_by: ctx.auth.userId,
					active: true,
					short_id: nanoid(10),
				})
				.returning();
			return newVoting[0];
		}),
});
