import { test, expect } from "@jest/globals";
import { createAuthContextInner } from "./authContext";
import { appRouter } from "~/server/api/root";

async function getCaller() {
	const context = await createAuthContextInner({});
	return appRouter.createCaller(context);
}

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
		limit: 2,
		offset: 0,
		voting_id: "b4f9b324-59df-4af1-8ea1-8f0229240fc4", // dummy UUID
	});

	console.log(result);

	const result2 = await caller.search.fullSearch({
		search_string: "Mock",
		limit: 2,
		offset: 2,
		voting_id: "b4f9b324-59df-4af1-8ea1-8f0229240fc4", // dummy UUID
	});

	console.log(result2);
});
