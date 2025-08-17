import { test, expect } from "@jest/globals";
import { appRouter } from "~/server/api/root";
import { createContextInner } from "../test/context";
import { createAuthContextInner } from "./authContext";
import { TRPCError } from "@trpc/server";
import { log } from "console";

const testVotingId = "b4f9b324-59df-4af1-8ea1-8f0229240fc4";
const audlectVotingId = "5b0c7148-90cc-4b8f-83a1-dea74841939d"

async function getCaller(){
  const context = await createAuthContextInner({});
  return appRouter.createCaller(context);;
}


test("getAll test", async () => {

  const context = await createContextInner({});

  const caller = appRouter.createCaller(context);

  const result = await caller.songs.songs({ limit: 1000, offset: 0, sort_method: "likes_total", voting_id: audlectVotingId});

  log(result);

  expect(result).not.toBeUndefined();
});


test("get entries", async () => {

  const context = await createContextInner({});

  const caller = appRouter.createCaller(context);

  const result = await caller.songs.entriesTotal({ voting_id: audlectVotingId});

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

    const result = await caller.songs.addSongID({voting_id: audlectVotingId, id: 71059074})

    console.log(result);

    addedSong = result;

    expect(result?.deezer_id).toBe("71059074");
  })

  test("remove Song test", async() => {
    const context = await createAuthContextInner({});
    const caller = appRouter.createCaller(context);

    if(addedSong === undefined) throw new Error();

    const result = await caller.songs.deleteSong({voting_id: audlectVotingId, song_id: addedSong.song_id})

    console.log(result);
  })
})

describe("errors while adding songs", () => {
  let addedSong1: SongInfo | undefined;
  let addedSong2: SongInfo | undefined;

  test("add song", async () => {
    const caller = await getCaller();
    const result = await caller.songs.addSongID({voting_id: audlectVotingId, id: 1645426722});
    addedSong1 = result;
    expect(result).toBeDefined();
  })

  test("add song another voting", async () => {
    const caller = await getCaller();
    const result = await caller.songs.addSongID({voting_id: testVotingId, id: 1645426722});
    addedSong2 = result;
    expect(result).toBeDefined(); 
  })

  test("remove song another voting", async () => {
    const caller = await getCaller();

    if(addedSong2 === undefined) throw new Error();

    const result = await caller.songs.deleteSong({voting_id: testVotingId, song_id: addedSong2?.song_id});
    expect(result).toBeDefined();
  });

  test("remove song", async () => {
    const caller = await getCaller();

    if(addedSong1 === undefined) throw new Error();

    const result = await caller.songs.deleteSong({voting_id: audlectVotingId, song_id: addedSong1?.song_id});
    expect(result).toBeDefined();
  });
});

describe("add - delete", () => {
  let addedSong : SongInfo | undefined;

  afterEach(async () => { 
    const caller = await getCaller(); 
    if(addedSong === undefined) throw new Error(); 
    await caller.songs.deleteSong({voting_id: testVotingId, song_id: addedSong?.song_id});
  })

  test("two same songs same voting", async () => {
    const caller = await getCaller();
    const result = await caller.songs.addSongID({voting_id: testVotingId, id: 2127304097});

    addedSong = result;

    await expect(caller.songs.addSongID({voting_id: testVotingId, id: 2127304097})).rejects.toThrow(TRPCError);
  });
})
