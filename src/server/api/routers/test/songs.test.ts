import { test, expect } from "@jest/globals";
import { appRouter } from "~/server/api/root";
import { createContextInner } from "../test/context";

test("getAll test", async () => {

  const context = await createContextInner({});

  const caller = appRouter.createCaller(context);

  const result = await caller.songs.songs({ limit: 10, offset: 0, sort_method: "Likes", voting_id: "5b0c7148-90cc-4b8f-83a1-dea74841939d"});

  console.log(result);

});