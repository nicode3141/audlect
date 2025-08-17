import { test, expect } from "@jest/globals";
import { appRouter } from "~/server/api/root";
import { createContextInner } from "../test/context";
import { createAuthContextInner } from "./authContext";

test("getAll test", async () => {

  const context = await createContextInner({});

  const caller = appRouter.createCaller(context);

  const result = await caller.songs.songs({ limit: 1000, offset: 0, sort_method: "likes_total", voting_id: "5b0c7148-90cc-4b8f-83a1-dea74841939d"});

  expect(result).not.toBeUndefined();
});


test("get entries", async () => {

  const context = await createContextInner({});

  const caller = appRouter.createCaller(context);

  const result = await caller.songs.entriesTotal({ voting_id: "5b0c7148-90cc-4b8f-83a1-dea74841939d"});

  console.log(result);

});


jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(() => ({
    userId: "test-user-id",
    sessionId: "test-session-id",
  })),
}));

type SongInfo = { 
  voting_id: string;
  created_at: Date | null; 
  song_id: string; 
  deezer_id: string; 
  isrc: string | null; 
  cover_image: string | null; 
  song_name: string | null; 
  song_artists: string | null; 
  preview_url: string | null; 
  added_by: string; 
};

describe("song post and delete", () => {
  
  let addedSong: SongInfo | undefined;
  test("add Song test", async() => {
    const context = await createAuthContextInner({});

    const caller = appRouter.createCaller(context);

    const result = await caller.songs.addSongID({voting_id: "5b0c7148-90cc-4b8f-83a1-dea74841939d", id: 71059074})

    console.log(result);

    addedSong = result;

    expect(result?.deezer_id).toBe("71059074");
  })

  test("remove Song test", async() => {
    const context = await createAuthContextInner({});

    const caller = appRouter.createCaller(context);

    if(addedSong === undefined){
      throw new Error();
    }

    const result = await caller.songs.deleteSong({voting_id: "5b0c7148-90cc-4b8f-83a1-dea74841939d", song_id: addedSong.song_id})

    console.log(result);
  })
})
