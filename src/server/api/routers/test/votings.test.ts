import { test, expect } from "@jest/globals";
import { appRouter } from "~/server/api/root";
import { createContextInner } from "../test/context";
import { createAuthContextInner } from "./authContext";

async function getCaller() {
	const context = await createAuthContextInner({});
	return appRouter.createCaller(context);
}

test("getAll test", async () => {
	const caller = await getCaller();

	const result = await caller.votings.votings({
		voting_id: "5b0c7148-90cc-4b8f-83a1-dea74841939d",
	});

	expect(result?.name).toBe("Audlect Top Songs");
});

jest.mock("@clerk/nextjs/server", () => ({
	auth: jest.fn(() => ({
		userId: "test-user-id",
		sessionId: "test-session-id",
	})),
}));

test("create voting", async () => {
	const caller = await getCaller();

	const result = await caller.votings.createVoting({
		name: "nicode's songs",
		description: "beste Songs ever?",
		public: true,
	});

	console.log(result);
});
