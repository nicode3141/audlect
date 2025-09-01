import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import type { DeezerSearchResult, DeezerTrack } from "~/types/deezer";
import { searchTrack, getTrack } from "~/server/utils/deezer";

export const searchRouter = createTRPCRouter({
    /**
     * @brief search tracks by string
     * 
     * @param search_string
     * @param limit number
     * @param offset number
     * 
     * @return items
     * 
     */
    searchString: protectedProcedure
        .input( z.object({
            search_string: z.string(),
            limit: z.number(),
            offset: z.number()
        }))
        .query(async ({ input }) => {
             //deezer API fetch metadata
            const items: DeezerSearchResult | undefined = await searchTrack(input.search_string, input.limit, input.offset);
            if(items === undefined){
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: "could'nt fetch data from deezer"
                });
            };
            return items; 
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
            const items: DeezerTrack | undefined = await getTrack(input.track_id);
            if(items === undefined){
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: "could'nt fetch data from deezer"
                });
            };
            return items; 
        }),
});