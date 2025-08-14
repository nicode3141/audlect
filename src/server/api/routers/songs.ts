import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { songsTable, votingsTable } from "~/server/db/schema";
import { getTrack } from "~/server/utils/deezer";

export const songsRouter = createTRPCRouter({

    /**
     * POST song to voting (AUTH)
     * 
     * fetches metadata from spotify
     * 
     * @param voting_id UUID
     * @param id string
     * @param added_by string
     * 
     * @return track:
     */

    addSongID: publicProcedure
        .input( z.object({
            voting_id: z.string().uuid(),
            id: z.number(),
            added_by: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            //deezer API fetch metadata
            const items = await getTrack(input.id.toString());
            
            console.log(items);

            await ctx.db.insert(songsTable).values({ 
                isrc: items.isrc, voting_id: input.voting_id, cover_image: items.album.cover,
                 song_artists: items.artist.name, preview_url: items.preview, added_by: "user_30rMaqwUhLfRWxfKVWyyOIVITw1" });

            return;
        }),


    /**
     * GET all songs
     * 
     * @param limit number
     * @param page number
     * @param sort_method union ( likes | Least Likes | Date Added | A-Z ) 
     * @param user_id string
     * @param voting_id UUID
     * 
     * @return songs:
     */
    votings: publicProcedure
        .input(
            z.object({
                voting_id: z.string().uuid()
            })
        )
        .query(async ({ ctx, input }) => {
            //SELECT * FROM votings WHERE voting_id = 798327357943;
            const votings = await ctx.db.select().from(votingsTable).where(eq(votingsTable.voting_id, input.voting_id)).limit(1);
            const name = votings[0]?.name;

            console.log(name);

            return votings[0];
        })
    
    /**
     * GET song by isrc
     * 
     * @param isrc string
     * @param voting_id UUID
     * 
     * song: 
     */
});