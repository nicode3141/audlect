import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { votingsTable } from "~/server/db/schema";

export const votingRouter = createTRPCRouter({
    votings: publicProcedure
        .query(async ({ ctx }) => {
            //SELECT * FROM votings WHERE voting_id = 798327357943;
            const votings = await ctx.db.select().from(votingsTable).where(eq(votingsTable.voting_id, "fe8c2c14-4e20-4f8a-a2f9-5db1039bd12f")).limit(1);
            const name = votings[0]?.name;

            console.log(name);

            return votings[0];
        })
});