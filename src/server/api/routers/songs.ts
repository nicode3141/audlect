import { TRPCError } from "@trpc/server";
import { and, asc, count, desc, eq, exists, sql } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protecedProcedure } from "~/server/api/trpc";
import { likesTable, songsTable, votingsTable } from "~/server/db/schema";
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
            let sortQuery;
            switch(input.sort_method){
                default:
                    sortQuery = desc(sql`likes_total`);
                    break
                case 'Least Likes':
                    sortQuery = asc(sql`likes_total`);
                    break
                case 'Date Added':
                    sortQuery = asc(songsTable.created_at);
                    break
                case 'A-Z':
                    sortQuery = asc(songsTable.song_name);
                    break
            }

            try{

                /**
                 * SQL: 
                 * let songsQuery = `SELECT *, (SELECT COUNT(*) FROM Likes WHERE song_uid = Songs.song_uid)
                 *      AS likes_total FROM Songs ${sortQuery} LIMIT ${input.limit} OFFSET ${input.offset}`
                 */

                let query = ctx.db
                    .select({
                        song_id: songsTable.song_id,
                        song_name: songsTable.song_name,
                        created_at: songsTable.created_at,
                        likes_total: count(likesTable.song_id).as("likes_total"),
                        liked: ctx.auth?.userId ? exists(
                            ctx.db.select({ one: sql`1`})
                                .from(likesTable)
                                .where(and(
                                    eq(likesTable.song_id, songsTable.song_id),
                                    eq(likesTable.user_id,ctx.auth?.userId)
                                ))).as("liked") : sql`false`.as("liked"),
                    })
                    .from(songsTable)
                    .leftJoin(likesTable, eq(likesTable.song_id, songsTable.song_id))
                    .where(eq(songsTable.voting_id, input.voting_id))
                    .groupBy(songsTable.song_id)
                    .orderBy(sortQuery)
                    .limit(input.limit)
                    .offset(input.offset)


                const songQuery = await query;

                return songQuery;

            } catch(err){
                console.log(err)
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