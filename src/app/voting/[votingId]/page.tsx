import { type Metadata } from "next";
import VotingHeader from "~/features/voting/VotingHeader/VotingHeader";
import VotingLayout from "~/components/layout/VotingLayout/VotingLayout";
import { VotingDetails } from "~/components/layout/VotingDetails/VotingDetails";
import { db } from "~/server/db";
import { votingsTable } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { VotingProvider } from "~/context/VotingContext";

export const metadata: Metadata = {
	title: "Audlect Top Songs",
	description: "Best songs from this month",
};

type PageParams = {
	params: Promise<{ votingId: string }>;
};

export default async function Page({ params }: PageParams) {
	const votingId = (await params).votingId;
	const [voting] = await db.select().from(votingsTable).where(eq(votingsTable.short_id, votingId)).limit(1);

	if (!voting) {
		return <div className="font-inter pt-7 lg:mt-24">Voting not found</div>;
	}

	return (
		<VotingProvider votingId={voting.voting_id} votingShortId={voting.short_id}>
			<VotingHeader votingTitle={voting.name} />
			<VotingDetails votingId={voting.voting_id} name={voting.name} description={voting.description} />
			<VotingLayout />
		</VotingProvider>
	);
}
