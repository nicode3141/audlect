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

jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(() => ({
    userId: "test-user-id",
    sessionId: "test-session-id",
  })),
}));

describe("like / unlike song", () => {
    test("like song", async() => {
        const caller = await getCaller();
        const result = await caller.likes.like({voting_id: testVotingId, song_id: "0ce69e82-0520-4b74-854a-bcc6940a091d"})
        console.log(result)
    });

    test("unlike song", async() => {
        const caller = await getCaller();
        const result = await caller.likes.unlike({voting_id: testVotingId, song_id: "0ce69e82-0520-4b74-854a-bcc6940a091d"})
        console.log(result)
    });
})