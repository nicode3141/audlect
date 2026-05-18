import { test, jest } from "@jest/globals";
import { createAuthContextInner } from "./authContext";
import { appRouter } from "~/server/api/root";
import { createMockDb } from "./utils";

jest.mock("~/server/utils/deezer", () => ({
	searchTrack: jest.fn(async () => ({
		data: [
			{
				id: 3,
				title: "Mock Song 3",
				artist: { id: 1, name: "Mock Artist" },
				album: { id: 1, cover: "mock.jpg" },
				preview: null,
			},
		],
	})),
	getTrack: jest.fn(),
}));

test("fullSearch pagination test", async () => {
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
		limit: 2,
		offset: 0,
		voting_id: "b4f9b324-59df-4af1-8ea1-8f0229240fc4",
	});

	console.log(result);

	const result2 = await caller.search.fullSearch({
		search_string: "Mock",
		limit: 2,
		offset: 2,
		voting_id: "b4f9b324-59df-4af1-8ea1-8f0229240fc4",
	});

	console.log(result2);
});
