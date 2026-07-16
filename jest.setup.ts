import { jest } from "@jest/globals";

jest.mock("~/lib/auth", () => ({
	auth: {
		api: {
			getSession: jest.fn<() => Promise<unknown>>().mockResolvedValue({
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
				},
			}),
		},
	},
}));
