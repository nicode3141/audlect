import { asc, count, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { nanoid } from "nanoid";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { likesTable, songsTable, votingsTable } from "~/server/db/schema";
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
					.select({ preview_image: songsTable.cover_image, voting_id: songsTable.voting_id })
					.from(songsTable)
					.leftJoin(likesTable, eq(likesTable.song_id, songsTable.song_id))
					.groupBy(songsTable.song_id)
					.orderBy(desc(count(likesTable.song_id)))
					.limit(1)
					.as("imageSubquery");

				const votings = await ctx.db
					.select({
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
					.leftJoin(imageSubquery, eq(votingsTable.voting_id, imageSubquery.voting_id))
					.where(eq(votingsTable.public, true))
					.orderBy(sortQuery)
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
					created_by: ctx.auth.session.userId,
					active: true,
					short_id: nanoid(10),
				})
				.returning();
			return newVoting[0];
		}),
});
