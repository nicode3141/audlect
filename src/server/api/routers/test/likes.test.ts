import { test, jest } from "@jest/globals";
import { appRouter } from "~/server/api/root";
import { createAuthContextInner } from "./authContext";
import { createMockDb } from "./utils";

jest.mock("~/server/utils/deezer", () => ({
	searchTrack: jest.fn(),
	getTrack: jest.fn(),
}));

const testVotingId = "b4f9b324-59df-4af1-8ea1-8f0229240fc4";

describe("like / unlike song", () => {
	test("like song", async () => {
		const mockDb = createMockDb({
			insertResult: [
				{
					song_id: "0ce69e82-0520-4b74-854a-bcc6940a091d",
					voting_id: testVotingId,
					user_id: "test-user-id",
				},
			],
			selectResult: [
				{
					song_id: "0ce69e82-0520-4b74-854a-bcc6940a091d",
					likes_total: 1,
					liked: true,
				},
			],
		});
		const context = await createAuthContextInner({}, { db: mockDb });
		const caller = appRouter.createCaller(context);

		const result = await caller.likes.like({
			voting_id: testVotingId,
			song_id: "0ce69e82-0520-4b74-854a-bcc6940a091d",
		});
		console.log(result);
	});

	test("unlike song", async () => {
		const mockDb = createMockDb({
			deleteResult: [
				{
					song_id: "0ce69e82-0520-4b74-854a-bcc6940a091d",
					voting_id: testVotingId,
					user_id: "test-user-id",
				},
			],
			selectResult: [
				{
					song_id: "0ce69e82-0520-4b74-854a-bcc6940a091d",
					likes_total: 0,
					liked: false,
				},
			],
		});
		const context = await createAuthContextInner({}, { db: mockDb });
		const caller = appRouter.createCaller(context);

		const result = await caller.likes.unlike({
			voting_id: testVotingId,
			song_id: "0ce69e82-0520-4b74-854a-bcc6940a091d",
		});
		console.log(result);
	});
});
