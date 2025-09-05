import { test, expect } from "@jest/globals"
import { createAuthContextInner } from "./authContext";
import { appRouter } from "~/server/api/root";



async function getCaller(){
    const context = await createAuthContextInner({});
    return appRouter.createCaller(context);;
}

jest.mock("~/server/utils/deezer", () => ({
  searchTrack: jest.fn(async () => ({
    data: [
        { id: 1, title: "Mock Song", artist: { id: 1, name: "Mock Artist" }, album: { id: 1, cover: "mock.jpg" }, preview: null },
        { id: 2, title: "Mocka", artist: { id: 1, name: "Mock Artist" }, album: { id: 1, cover: "mock.jpg" }, preview: null },
    ],
  })),
  getTrack: jest.fn(),
}));

jest.mock("@clerk/nextjs/server", () => ({
    auth: jest.fn(() => ({
        userId: "test-user-id",
        sessionId: "test-session-id",
    })),
}));

test("fullSearch returns both local and Deezer items", async () => {
    const caller = await getCaller();

    const result = await caller.search.fullSearch({
        search_string: "Mock",
        limit: 10,
        offset: 0,
        voting_id: "b4f9b324-59df-4af1-8ea1-8f0229240fc4", // dummy UUID
    });

    console.log(result)

    // Check structure
    expect(result).toHaveProperty("added_items");
    expect(result).toHaveProperty("deezer_items");

    expect(result.added_items?.[0]?.song_name).toBe("Mock");
    expect(result.added_items?.[0]?.song_artists).toBe("Mock Artist");

    // Check Deezer mocked result
    expect(result.deezer_items?.[0]?.song_name).toBe("Mocka");
    expect(result.deezer_items?.[0]?.song_artists).toBe("Mock Artist");
});