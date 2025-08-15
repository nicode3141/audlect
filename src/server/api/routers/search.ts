import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { searchTrack, getTrack } from "~/server/utils/deezer";

export const searchRouter = createTRPCRouter({
    /**
     * @brief search tracks by string
     * 
     * @param search_string
     * 
     * @return items
     * 
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


     /**
     * @brief retreives metadata for a given track
     * 
     * @param track_id string
     * 
     * @return items
     * 
     */
    getTrack: publicProcedure
        .input( z.object({
            track_id: z.string()
        }))
        .query(async ({ input }) => {
             //deezer API fetch metadata
            const items = await getTrack(input.track_id);
            
            return items.data; 
        }),
});