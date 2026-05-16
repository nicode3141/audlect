import { test, expect } from "@jest/globals";
import { appRouter } from "~/server/api/root";
import { createAuthContextInner } from "./authContext";
import { createMockDb } from "./utils";

test("getAll test", async () => {
	const mockDb = createMockDb({
		selectResult: [
			{
				voting_id: "5b0c7148-90cc-4b8f-83a1-dea74841939d",
				name: "Audlect Top Songs",
				description: "Top songs",
				public: true,
				active: true,
				short_id: "abc123",
			},
		],
	});
	const context = await createAuthContextInner({}, { db: mockDb });
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
	const caller = appRouter.createCaller(context as any);

	const result = await caller.votings.votings({
		voting_id: "5b0c7148-90cc-4b8f-83a1-dea74841939d",
	});

	expect(result?.name).toBe("Audlect Top Songs");
});
