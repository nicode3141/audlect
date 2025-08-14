import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { votingsTable } from "~/server/db/schema";

export const searchRouter = createTRPCRouter({
    /**
     * @brief GET tracks by string AUTH
     * 
     * @param search_string string
     * @param limit number
     * @param offset number
     * 
     * @return tracks
     */
    searchString: publicProcedure
        .input( z.object({
            search_string: z.string()
        }))
        .query(async ({ ctx, input }) => {
            //spotify API fetch metadata
        }),

    /**
     * @brief GET track metadata by isrc AUTH
     * 
     * @param isrc string
     * 
     * @return track
     */
    getTrack: publicProcedure
        .input( z.object({
            search_string: z.string().min(12)
        }))
        .query(async ({ ctx, input }) => {
            //spotify API fetch metadata
        })
});