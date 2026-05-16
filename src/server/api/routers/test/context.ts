import { db as realDb } from "~/server/db";

type CreateContextOptions = object;

export async function createContextInner(
	_opts: CreateContextOptions,
	overrides?: { db?: Record<string, unknown> },
) {
	return {
		headers: new Headers(),
		auth: null,
		db: overrides?.db ?? realDb,
	};
}
