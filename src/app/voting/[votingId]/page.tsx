import { type Metadata } from "next";
import VotingHeader from "~/features/voting/VotingHeader/VotingHeader";
import VotingLayout from "~/components/layout/VotingLayout/VotingLayout";
import { VotingDetails } from "~/components/layout/VotingDetails/VotingDetails";
import { db } from "~/server/db";
import { votingsTable } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { VotingProvider } from "~/context/VotingContext";
import { LoginWarnProvider } from "~/context/LoginWarningContext";
import Footer from "~/components/layout/global/Footer";
import { getVoting } from "~/lib/getVoting";
import { Memberships } from "~/components/ui/AuthManagement/Memberships";

export async function generateMetadata({ params }: PageParams) {
	const votingId = (await params).votingId;
	const [voting] = await getVoting(votingId);
	return {
		title: voting?.name ?? "Audlect Voting",
		description: voting?.description ?? "Vote Music with your Friends, Guests and Artists",
	};
}

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
			<div className="flex min-h-screen flex-col">
				<VotingHeader votingTitle={voting.name} />
				<VotingDetails votingId={voting.voting_id} name={voting.name} description={voting.description} />
				<Memberships />
				<LoginWarnProvider>
					<VotingLayout />
				</LoginWarnProvider>
				<Footer />
			</div>
		</VotingProvider>
	);
}
