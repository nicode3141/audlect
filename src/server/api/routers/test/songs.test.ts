import { test, expect, jest } from "@jest/globals";
import { appRouter } from "~/server/api/root";
import { createAuthContextInner } from "./authContext";
import { createMockDb } from "./utils";
import { TRPCError } from "@trpc/server";

jest.mock("~/server/utils/deezer", () => ({
	searchTrack: jest.fn(),
	getTrack: jest.fn<() => Promise<unknown>>().mockResolvedValue({
		id: 71059074,
		title: "Test Song",
		artist: { name: "Test Artist" },
		album: { cover_medium: "test.jpg" },
		isrc: "TEST123",
		preview: null,
	}),
}));

const audlectVotingId = "5b0c7148-90cc-4b8f-83a1-dea74841939d";

describe("songs router", () => {
	test("getAll test", async () => {
		const mockDb = createMockDb({
			selectResult: [
				{
					song_id: "1",
					deezer_id: 1,
					voting_id: audlectVotingId,
					song_name: "Test Song",
					song_artists: "Test Artist",
					created_at: new Date().toISOString(),
					likes_total: 0,
					rank: 1,
					liked: false,
				},
			],
		});
		const context = await createAuthContextInner({}, { db: mockDb });
		const caller = appRouter.createCaller(context);

		const result = await caller.songs.songs({
			limit: 1000,
			offset: 0,
			sort_method: "likes_total",
			voting_id: audlectVotingId,
		});

		expect(result).not.toBeUndefined();
		expect(mockDb.select).toHaveBeenCalled();
	});

	test("get entries", async () => {
		const mockDb = createMockDb({
			selectResult: [{ count: 5 }],
		});
		const context = await createAuthContextInner({}, { db: mockDb });
		const caller = appRouter.createCaller(context);

		const result = await caller.songs.entriesTotal({
			voting_id: audlectVotingId,
		});

		expect(result?.count).toBe(5);
	});
});

describe("song post and delete", () => {
	test("add Song test", async () => {
		const mockDb = createMockDb({
			insertResult: [
				{
					song_id: "new-song-id",
					deezer_id: 71059074,
					voting_id: audlectVotingId,
				},
			],
		});
		const context = await createAuthContextInner({}, { db: mockDb });
		const caller = appRouter.createCaller(context);

		const result = await caller.songs.addSongID({
			voting_id: audlectVotingId,
			id: 71059074,
		});

		expect(result?.deezer_id).toBe(71059074);
	});

	test("remove Song test", async () => {
		const mockDb = createMockDb({
			selectResult: [{ role: "owner", user_id: "test-user-id", voting_id: audlectVotingId }],
			deleteResult: [{ song_id: "song-to-delete" }],
		});
		const context = await createAuthContextInner({}, { db: mockDb });
		const caller = appRouter.createCaller(context);

		const result = await caller.songs.deleteSong({
			voting_id: audlectVotingId,
			song_id: "8c8e0b1a-4c2d-4f0e-9c8a-7b6a5f4e3d2c",
		});

		expect(result).toBeDefined();
	});
});

describe("errors while adding songs", () => {
	test("add song", async () => {
		const mockDb = createMockDb({
			insertResult: [{ song_id: "song-1", deezer_id: 1645426722, voting_id: audlectVotingId }],
		});
		const context = await createAuthContextInner({}, { db: mockDb });
		const caller = appRouter.createCaller(context);

		const result = await caller.songs.addSongID({
			voting_id: audlectVotingId,
			id: 1645426722,
		});
		expect(result).toBeDefined();
	});
});

describe("add - delete duplicate handling", () => {
	test("two same songs same voting throws CONFLICT", async () => {
		let callCount = 0;
		const mockDb = createMockDb({
			insertResult: () => {
				callCount++;
				if (callCount > 1) throw new Error("duplicate key value violates unique constraint");
				return [{ song_id: "song-1", deezer_id: 2127304097, voting_id: audlectVotingId }];
			},
		});
		const context = await createAuthContextInner({}, { db: mockDb });
		const caller = appRouter.createCaller(context);

		await caller.songs.addSongID({ voting_id: audlectVotingId, id: 2127304097 });

		await expect(caller.songs.addSongID({ voting_id: audlectVotingId, id: 2127304097 })).rejects.toThrow(TRPCError);
	});
});
