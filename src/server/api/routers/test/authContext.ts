import { db as realDb } from "~/server/db";
import { auth } from "~/lib/auth";
import type { createTRPCContext } from "~/server/api/trpc";

type CreateContextOptions = object;

type MockAuthSession = {
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
	};
};

export async function createAuthContextInner(
	_opts: CreateContextOptions,
	overrides?: {
		db?: Record<string, unknown>;
		session?: MockAuthSession | null;
	},
): Promise<Awaited<ReturnType<typeof createTRPCContext>>> {
	const authSession = overrides?.session !== undefined ? overrides.session : await auth.api.getSession();

	return {
		headers: new Headers(),
		auth: authSession as Awaited<ReturnType<typeof createTRPCContext>>["auth"],
		db: (overrides?.db ?? realDb) as Awaited<ReturnType<typeof createTRPCContext>>["db"],
	};
}
