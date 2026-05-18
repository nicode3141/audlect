import { test, expect, jest } from "@jest/globals";
import { createAuthContextInner } from "./authContext";
import { appRouter } from "~/server/api/root";
import { createMockDb } from "./utils";

jest.mock("~/server/utils/deezer", () => ({
	searchTrack: jest.fn(async () => ({
		data: [
			{
				id: 1,
				title: "Mock Song",
				artist: { id: 1, name: "Mock Artist" },
				album: { id: 1, cover: "mock.jpg" },
				preview: null,
			},
			{
				id: 2,
				title: "Mocka",
				artist: { id: 1, name: "Mock Artist" },
				album: { id: 1, cover: "mock.jpg" },
				preview: null,
			},
		],
	})),
	getTrack: jest.fn(),
}));

test("fullSearch returns both local and Deezer items", async () => {
	const mockDb = createMockDb({
		selectResult: [
			{
				song_id: "1",
				deezer_id: 1,
				voting_id: "b4f9b324-59df-4af1-8ea1-8f0229240fc4",
				song_name: "Mock",
				song_artists: "Mock Artist",
				liked: true,
				likes_total: 5,
			},
		],
	});

	const context = await createAuthContextInner({}, { db: mockDb });
	const caller = appRouter.createCaller(context);

	const result = await caller.search.fullSearch({
		search_string: "Mock",
		limit: 10,
		offset: 0,
		voting_id: "b4f9b324-59df-4af1-8ea1-8f0229240fc4",
	});

	console.log(result);

	expect(result).toHaveProperty("added_items");
	expect(result).toHaveProperty("deezer_items");

	expect(result.added_items?.[0]?.song_name).toBe("Mock");
	expect(result.added_items?.[0]?.song_artists).toBe("Mock Artist");

	expect(result.deezer_items?.[0]?.song_name).toBe("Mocka");
	expect(result.deezer_items?.[0]?.song_artists).toBe("Mock Artist");
});
