import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "~/server/db";
import { votingsTable } from "~/server/db/schema";

export const getVoting = cache(async (votingId: string) => {
	const voting = await db.select().from(votingsTable).where(eq(votingsTable.short_id, votingId)).limit(1);
	return voting;
});
