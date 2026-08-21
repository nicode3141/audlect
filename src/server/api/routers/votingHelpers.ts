import { and, asc, count, desc, eq, gt, isNull, lt, or, sql } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { likesTable, songsTable, votingsTable } from "~/server/db/schema";

import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type * as schema from "~/server/db/schema";

const votingCursorSchema = z.discriminatedUnion("sort", [
	z.object({
		sort: z.literal("date"),
		createdAt: z.string(),
		votingId: z.uuid(),
	}),

	z.object({
		sort: z.literal("a-z"),
		name: z.string(),
		votingId: z.uuid(),
	}),

	z.object({
		sort: z.literal("popularity"),
		popularity: z.number(),
		votingId: z.uuid(),
	}),
]);

type VotingCursor = z.infer<typeof votingCursorSchema>;

export function encodeCursor(cursor: VotingCursor): string {
	return Buffer.from(JSON.stringify(cursor)).toString("base64url");
}

export function decodeCursor(cursor: string | null | undefined): VotingCursor | null {
	if (!cursor) {
		return null;
	}

	try {
		const decoded = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")) as VotingCursor;

		return votingCursorSchema.parse(decoded);
	} catch {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Invalid pagination cursor",
		});
	}
}

type Db = PostgresJsDatabase<typeof schema>;

export function buildTopSongSubquery(db: Db) {
	const songLikes = db
		.select({
			song_id: songsTable.song_id,
			voting_id: songsTable.voting_id,
			cover_image: songsTable.cover_image,
			like_count: count(likesTable.song_id).as("like_count"),
		})
		.from(songsTable)
		.leftJoin(likesTable, eq(likesTable.song_id, songsTable.song_id))
		.groupBy(songsTable.song_id, songsTable.voting_id, songsTable.cover_image)
		.as("song_stats");

	const topSong = db
		.selectDistinctOn([songLikes.voting_id], {
			voting_id: songLikes.voting_id,
			preview_image: songLikes.cover_image,
			popularity: songLikes.like_count,
			song_id: songLikes.song_id,
		})
		.from(songLikes)
		.orderBy(songLikes.voting_id, desc(songLikes.like_count), asc(songLikes.song_id))
		.as("best_song");

	return topSong;
}

export function buildCursorCondition(cursor: VotingCursor, topSong: ReturnType<typeof buildTopSongSubquery>) {
	switch (cursor.sort) {
		case "date": {
			const createdAt = new Date(cursor.createdAt);

			if (Number.isNaN(createdAt.getTime())) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Invalid date cursor",
				});
			}

			//if voting.date < cursor.date || voting.date == cursor.date && voting.voting_id < cursor.votingId
			return or(
				lt(votingsTable.created_at, createdAt),
				and(eq(votingsTable.created_at, createdAt), lt(votingsTable.voting_id, cursor.votingId)),
			);
		}

		case "a-z": {
			//if voting.name > cursor.name || voting.name == cursor.name && voting.voting_id < cursor.votingId
			return or(
				gt(votingsTable.name, cursor.name),
				and(eq(votingsTable.name, cursor.name), gt(votingsTable.voting_id, cursor.votingId)),
			);
		}

		case "popularity": {
			//if topSong.popularity < cursor.popularity || topSong.popularity == cursor.popularity && voting.voting_id < cursor.votingId
			return or(
				isNull(topSong.popularity),
				sql`${topSong.popularity} < ${cursor.popularity}`,
				and(eq(topSong.popularity, cursor.popularity), lt(votingsTable.voting_id, cursor.votingId)),
			);
		}
	}
}

export function buildOrderBy(sortMethod: string, topSong: ReturnType<typeof buildTopSongSubquery>) {
	switch (sortMethod) {
		case "date":
			return [desc(votingsTable.created_at), desc(votingsTable.voting_id)];

		case "a-z":
			return [asc(votingsTable.name), asc(votingsTable.voting_id)];

		case "popularity":
			return [sql`${topSong.popularity} DESC NULLS LAST`, desc(votingsTable.voting_id)];

		default:
			return [desc(votingsTable.created_at), desc(votingsTable.voting_id)];
	}
}
