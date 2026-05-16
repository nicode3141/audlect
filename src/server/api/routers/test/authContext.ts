import { db as realDb } from "~/server/db";
import { auth } from "~/lib/auth";
import { getMockAuthSession } from "./utils";

type CreateContextOptions = object;

export async function createAuthContextInner(
	_opts: CreateContextOptions,
	overrides?: {
		db?: Record<string, unknown>;
		session?: {
			session: { userId: string; id: string };
			user: {
				id: string;
				name: string;
				email: string;
				emailVerified: boolean;
				createdAt: Date;
				updatedAt: Date;
				image: string | null;
				role: string | null;
				banned: boolean;
				banReason: string | null;
				banExpires: Date | null;
				twoFactorEnabled: boolean;
				username: string | null;
				displayUsername: string | null;
				votingMemberships: Array<{ votingId: string; role: string }>;
			};
		} | null;
	},
) {
	const authSession = overrides?.session !== undefined ? overrides.session : await auth.api.getSession();

	return {
		headers: new Headers(),
		auth: authSession,
		db: overrides?.db ?? realDb,
	};
}