import { TRPCError } from "@trpc/server";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protecedProcedure } from "~/server/api/trpc";
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

    addSongID: protecedProcedure
        .input( z.object({
            voting_id: z.string().uuid(),
            id: z.number()
        }))
        .mutation(async ({ ctx, input }) => {
            //deezer API fetch metadata
            const item = await getTrack(input.id.toString());

            const [existingSong] = await ctx.db.select().from(songsTable).where(eq(songsTable.deezer_id, item.id));
            
            if(existingSong){
                console.log("Song already added");
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Song already added'
                })
            }

            await ctx.db.insert(songsTable).values({ 
                deezer_id: item.id, isrc: item.isrc, voting_id: input.voting_id, cover_image: item.album.cover,
                song_name: item.title, song_artists: item.artist.name, preview_url: item.preview, added_by: ctx.auth.userId});

            return;
        }),


    /**
     * GET all songs
     * 
     * @param limit number
     * @param offset number
     * @param sort_method union ( likes | Least Likes | Date Added | A-Z )
     * @param voting_id UUID
     * 
     * @return songs:
     */
    songs: publicProcedure
        .input(
            z.object({
                limit: z.number(),
                offset: z.number(),
                sort_method: z.string(),
                voting_id: z.string().uuid()
            })
        )
        .query(async ({ ctx, input }) => {
            //SELECT * FROM votings WHERE voting_id = 798327357943;

            let sortQuery = ''
            switch(input.sort_method){
                default:
                sortQuery = 'ORDER BY likes_total DESC'
                break
                case 'Least Likes':
                sortQuery = 'ORDER BY likes_total ASC'
                break
                case 'Date Added':
                sortQuery = 'ORDER BY created_at DESC'
                break
                case 'A-Z':
                sortQuery = 'ORDER BY songName ASC'
                break
            }

            try{

                let songsQuery = `SELECT *, (SELECT COUNT(*) FROM Likes WHERE song_uid = Songs.song_uid)
                AS likes_total FROM Songs ${sortQuery} LIMIT ${input.limit} OFFSET ${input.offset}`

                if(ctx.auth.userId){
                songsQuery = `SELECT *, (SELECT COUNT(*) FROM Likes WHERE song_uid = Songs.song_uid) AS likes_total,
                    EXISTS(SELECT 1 FROM Likes WHERE song_uid = Songs.song_uid AND user_id = ${ctx.auth.userId}) AS liked
                    FROM Songs ${sortQuery} LIMIT ${input.limit} OFFSET ${input.offset}`
                }


                const [songQuery] = await ctx.db.execute(sql+songsQuery);
                console.log(songQuery);

            } catch(err){
                
            }  

            

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