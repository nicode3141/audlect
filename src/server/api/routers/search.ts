import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { votingsTable } from "~/server/db/schema";
import { searchTrack } from "~/server/utils/deezer";

export const searchRouter = createTRPCRouter({
    /**
     * GET votings by ID (UUID)
     * 
     * voting: voting_id, name, description, created_by, public, active, created_at
     */
    searchString: publicProcedure
        .input( z.object({
            search_string: z.string()
        }))
        .query(async ({ input }) => {
             //deezer API fetch metadata
            const items = await searchTrack(input.search_string, 10, 0);
            
            return items.data; 
        }),
});