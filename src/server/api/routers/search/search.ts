import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import type { DeezerSearchResult } from "~/types/songs";
import { searchTrack } from "~/server/utils/deezer";
import { likesTable, songsTable } from "~/server/db/schema";
import { and, count, eq, exists, ilike, sql } from "drizzle-orm";

export const searchRouter = createTRPCRouter({
    /**
     * @brief search tracks by string
     * 
     * @param search_string
     * @param limit number
     * @param offset number
     * @param voting_id string (uuid)
     * 
     * @return items
     * 
     */
    fullSearch: protectedProcedure
        .input( z.object({
            search_string: z.string(),
            limit: z.number(),
            offset: z.number(),
            voting_id: z.string().uuid()
        }))
        .query(async ({ ctx, input }) => {
            try{
                const added_items = await ctx.db
                    .select({
                        song_id: songsTable.song_id,
                        deezer_id: songsTable.deezer_id,
                        isrc: songsTable.isrc,
                        voting_id: songsTable.voting_id,
                        song_name: songsTable.song_name,
                        song_artists: songsTable.song_artists,
                        cover_image: songsTable.cover_image,
                        preview_url: songsTable.preview_url,
                        added_by: songsTable.added_by,
                        created_at: songsTable.created_at,
                        likes_total: count(likesTable.song_id).as("likes_total"),
                        liked: ctx.auth?.userId ? exists(
                            ctx.db.select({ one: sql`1`})
                                .from(likesTable)
                                .where(and(
                                    eq(likesTable.song_id, songsTable.song_id),
                                    eq(likesTable.user_id,ctx.auth?.userId)
                                ))).as("liked") : sql`false`.as("liked"),

                    }).from(songsTable)
                    .leftJoin(likesTable, eq(likesTable.song_id, songsTable.song_id))
                    .where(and(
                        eq(songsTable.voting_id, input.voting_id),
                        ilike(songsTable.song_name, `%${input.search_string}%`),
                        ilike(songsTable.song_artists, `%${input.search_string}%`)
                    ))
                    .groupBy(songsTable.song_id);

                const deezer_items: DeezerSearchResult | undefined = await searchTrack(
                    input.search_string,
                    input.limit, 
                    input.offset
                );

                const added_song_ids = new Set(added_items.map((item) => item.deezer_id));
                const filtered_deezer_items = deezer_items?.data
                .filter(
                        (item) => !added_song_ids.has(item.id.toString())
                ).map((item) => ({
                    deezer_id: item.id.toString(),
                    song_name: item.title,
                    song_artists: item.artist.name,
                    cover_image: item.album.cover,
                    preview_url: item.preview,
                }));

                return {
                    added_items,
                    deezer_items: filtered_deezer_items
                };
            } catch(err){
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: (err instanceof Error) ? err.message : "couldn't fetch songs" 
                });
            }
        }),
});