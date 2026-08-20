import {
    and,
    asc,
    count,
    desc,
    eq,
    gt,
    lt,
    or,
    sql,
} from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../trpc";

const votingCursorSchema = z.discriminatedUnion("sort", [
    z.object({
        sort: z.literal("date"),
        createdAt: z.string(),
        votingId: z.number(),
    }),

    z.object({
        sort: z.literal("a-z"),
        name: z.string(),
        votingId: z.number(),
    }),

    z.object({
        sort: z.literal("popularity"),
        popularity: z.number(),
        votingId: z.number(),
    }),
]);

type VotingCursor = z.infer<typeof votingCursorSchema>;

function encodeCursor(cursor: VotingCursor): string {
    return Buffer.from(JSON.stringify(cursor)).toString("base64url");
}

function decodeCursor(
    cursor: string | null | undefined,
): VotingCursor | null {
    if (!cursor) {
        return null;
    }

    try {
        const decoded = JSON.parse(
            Buffer.from(cursor, "base64url").toString("utf8"),
        );

        return votingCursorSchema.parse(decoded);
    } catch {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid pagination cursor",
        });
    }
}

getPublicVotings: publicProcedure
    .input(
        z.object({
            limit: z.number().int().min(1).max(50).default(20),

            cursor: z.string().nullish(),

            sort_method: z
                .enum(["date", "popularity", "a-z"])
                .default("date"),
        }),
    )
    .query(async ({ ctx, input }) => {
        const cursor = decodeCursor(input.cursor);

        /*
         * Calculate likes per song.
         *
         * Example:
         *
         * song A → 15 likes
         * song B → 42 likes
         * song C → 3 likes
         */
        const songStats = ctx.db
            .select({
                song_id: songsTable.song_id,
                voting_id: songsTable.voting_id,
                cover_image: songsTable.cover_image,
                like_count: count(likesTable.song_id).as("like_count"),
            })
            .from(songsTable)
            .leftJoin(
                likesTable,
                eq(likesTable.song_id, songsTable.song_id),
            )
            .groupBy(
                songsTable.song_id,
                songsTable.voting_id,
                songsTable.cover_image,
            )
            .as("song_stats");

        /*
         * Select exactly one song per voting:
         *
         * - highest like_count wins
         * - song_id is the deterministic tie-breaker
         *
         * Therefore preview_image is always the cover
         * of the most-liked song.
         */
        const bestSong = ctx.db
            .selectDistinctOn([songStats.voting_id], {
                voting_id: songStats.voting_id,
                preview_image: songStats.cover_image,
                popularity: songStats.like_count,
                song_id: songStats.song_id,
            })
            .from(songStats)
            .orderBy(
                songStats.voting_id,
                desc(songStats.like_count),
                asc(songStats.song_id),
            )
            .as("best_song");

        /*
         * Build the cursor condition.
         *
         * The cursor contains the values of the LAST item
         * from the previous page.
         */
        let cursorCondition;

        if (cursor) {
            /*
             * The cursor must belong to the current sorting mode.
             */
            if (cursor.sort !== input.sort_method) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Cursor does not match sort method",
                });
            }

            switch (input.sort_method) {
                case "date": {
                    const createdAt = new Date(cursor.createdAt);

                    if (Number.isNaN(createdAt.getTime())) {
                        throw new TRPCError({
                            code: "BAD_REQUEST",
                            message: "Invalid date cursor",
                        });
                    }

                    cursorCondition = or(
                        lt(votingsTable.created_at, createdAt),
                        and(
                            eq(votingsTable.created_at, createdAt),
                            lt(
                                votingsTable.voting_id,
                                cursor.votingId,
                            ),
                        ),
                    );

                    break;
                }

                case "a-z": {
                    cursorCondition = or(
                        gt(votingsTable.name, cursor.name),
                        and(
                            eq(votingsTable.name, cursor.name),
                            gt(
                                votingsTable.voting_id,
                                cursor.votingId,
                            ),
                        ),
                    );

                    break;
                }

                case "popularity": {
                    /*
                     * NULL popularity is handled separately.
                     *
                     * Non-null popularity:
                     *
                     * popularity DESC
                     * voting_id DESC
                     */
                    cursorCondition = or(
                        sql`${bestSong.popularity} < ${cursor.popularity}`,
                        and(
                            eq(
                                bestSong.popularity,
                                cursor.popularity,
                            ),
                            lt(
                                votingsTable.voting_id,
                                cursor.votingId,
                            ),
                        ),
                    );

                    break;
                }
            }
        }

        /*
         * Stable ordering.
         *
         * voting_id acts as a tie-breaker so that pagination
         * cannot randomly change between requests.
         */
        const orderBy = (() => {
            switch (input.sort_method) {
                case "date":
                    return [
                        desc(votingsTable.created_at),
                        desc(votingsTable.voting_id),
                    ];

                case "a-z":
                    return [
                        asc(votingsTable.name),
                        asc(votingsTable.voting_id),
                    ];

                case "popularity":
                    return [
                        sql`${bestSong.popularity} DESC NULLS LAST`,
                        desc(votingsTable.voting_id),
                    ];
            }
        })();

        try {
            /*
             * Fetch one additional row.
             *
             * limit = 20
             * actual DB query = 21
             *
             * If 21 rows exist, we know another page exists.
             */
            const rows = await ctx.db
                .select({
                    voting_id: votingsTable.voting_id,
                    short_id: votingsTable.short_id,
                    name: votingsTable.name,
                    description: votingsTable.description,
                    external_url: votingsTable.external_url,
                    created_by: votingsTable.created_by,
                    public: votingsTable.public,
                    active: votingsTable.active,
                    created_at: votingsTable.created_at,

                    preview_image: bestSong.preview_image,
                    popularity: bestSong.popularity,
                })
                .from(votingsTable)
                .leftJoin(
                    bestSong,
                    eq(
                        votingsTable.voting_id,
                        bestSong.voting_id,
                    ),
                )
                .where(
                    and(
                        eq(votingsTable.public, true),
                        cursorCondition,
                    ),
                )
                .orderBy(...orderBy)
                .limit(input.limit + 1);

            /*
             * Determine whether another page exists.
             */
            const hasNextPage = rows.length > input.limit;

            const votings = hasNextPage
                ? rows.slice(0, input.limit)
                : rows;

            /*
             * Generate the cursor from the LAST returned item.
             */
            let nextCursor: string | null = null;

            if (hasNextPage) {
                const last = votings[votings.length - 1];

                if (!last) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to create pagination cursor",
                    });
                }

                switch (input.sort_method) {
                    case "date":
                        nextCursor = encodeCursor({
                            sort: "date",
                            createdAt: last.created_at.toISOString(),
                            votingId: last.voting_id,
                        });
                        break;

                    case "a-z":
                        nextCursor = encodeCursor({
                            sort: "a-z",
                            name: last.name,
                            votingId: last.voting_id,
                        });
                        break;

                    case "popularity":
                        /*
                         * A voting without songs has NULL popularity.
                         *
                         * Such rows should not be used as a popularity
                         * cursor because NULLS LAST requires special
                         * handling.
                         */
                        if (last.popularity === null) {
                            nextCursor = null;
                        } else {
                            nextCursor = encodeCursor({
                                sort: "popularity",
                                popularity: last.popularity,
                                votingId: last.voting_id,
                            });
                        }

                        break;
                }
            }

            return {
                items: votings,
                nextCursor,
            };
        } catch (error) {
            console.error(
                "getPublicVotings failed:",
                error,
            );

            if (error instanceof TRPCError) {
                throw error;
            }

            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to fetch public votings",
            });
        }
    }),