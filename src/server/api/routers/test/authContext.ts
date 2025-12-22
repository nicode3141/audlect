//mock context for tRPC

import { db } from "~/server/db";
import { auth } from "~/lib/auth";

type CreateContextOptions = object;

export async function createAuthContextInner(_opts: CreateContextOptions) {
	const authSession = await auth.api.getSession();

	return {
		headers: new Headers(),
		auth: authSession,
		db: db,
	};
}
