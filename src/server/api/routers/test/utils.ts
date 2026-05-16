import { jest } from "@jest/globals";

function chainResult(result: unknown) {
	return new Proxy(
		{},
		{
			get(_target, prop) {
				if (prop === "then") {
					return (resolve: (v: unknown) => void) =>
						resolve(typeof result === "function" ? (result as () => unknown)() : result);
				}
				if (prop === "catch") return undefined;
				return () => chainResult(result);
			},
		},
	);
}

export function createMockDb(results?: {
	selectResult?: unknown;
	insertResult?: unknown;
	deleteResult?: unknown;
	updateResult?: unknown;
}) {
	const selectResult = results?.selectResult ?? [];
	const insertResult = results?.insertResult ?? [];
	const deleteResult = results?.deleteResult ?? [];
	const updateResult = results?.updateResult ?? [];

	return {
		select: jest.fn(() => chainResult(selectResult)),
		insert: jest.fn(() => chainResult(insertResult)),
		delete: jest.fn(() => chainResult(deleteResult)),
		update: jest.fn(() => chainResult(updateResult)),
	};
}

export function getMockAuthSession() {
	return {
		session: {
			userId: "test-user-id",
			id: "test-session-id",
		},
		user: {
			id: "test-user-id",
			name: "Test User",
			email: "test@example.com",
			emailVerified: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			image: null,
			role: null,
			banned: false,
			banReason: null,
			banExpires: null,
			twoFactorEnabled: false,
			username: "testuser",
			displayUsername: "Test User",
			votingMemberships: [] as Array<{ votingId: string; role: "owner" | "moderator" | "participant" }>,
		},
	};
}
