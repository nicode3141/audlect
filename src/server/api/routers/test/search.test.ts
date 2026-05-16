import { test, expect, jest } from "@jest/globals";
import { searchTrack, getTrack } from "~/server/utils/deezer";
import { createAuthContextInner } from "./authContext";
import { appRouter } from "~/server/api/root";
import { createMockDb } from "./utils";

jest.mock("~/server/utils/deezer", () => ({
	searchTrack: jest
		.fn<() => Promise<unknown>>()
		.mockResolvedValue({ data: [{ id: 1, title: "Waterfalls", artist: { name: "Test" }, album: { cover: "x.jpg" }, preview: null }] }),
	getTrack: jest
		.fn<() => Promise<unknown>>()
		.mockResolvedValue({ id: 3487048191, title: "Test Track", artist: { name: "James Hype" }, album: { cover_medium: "x.jpg" } }),
}));

test("search-test", async () => {
	const searchOutput = await searchTrack("Waterfalls", 10, 0);

	expect(searchOutput?.data[0]?.title).toBe("Waterfalls");
});

test("track-test Metadata", async () => {
	const searchOutput = await getTrack("3487048191");

	expect(searchOutput?.artist.name).toBe("James Hype");
});

test("search track via router", async () => {
	const mockDb = createMockDb();
	const context = await createAuthContextInner({}, { db: mockDb });
	const caller = appRouter.createCaller(context);

	const result = await caller.deezerSearch.searchString({
		search_string: "Cool",
		limit: 10,
		offset: 0,
	});
	expect(result).toBeDefined();
});
