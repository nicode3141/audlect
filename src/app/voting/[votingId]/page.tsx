import VotingHeader from "~/features/votings/components/VotingHeader";
import VotingLayout from "~/features/voting/components/VotingLayout";
import { VotingDetails } from "~/features/votings/components/VotingDetails";
import { db } from "~/server/db";
import { votingsTable } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { VotingProvider } from "~/features/votings/context/VotingContext";
import { LoginWarnProvider } from "~/shared/components/LoginWarningContext";
import Footer from "~/shared/components/AppFooter";
import { getVoting } from "~/lib/getVoting";
import { AudioProvider } from "~/features/voting/context/AudioContext";
import AudioProgressBar from "~/features/voting/components/AudioProgressBar";
import VotingInfoBar from "~/features/votings/components/VotingInfoBar";
import NotFound from "~/features/votings/components/NotFound";

export async function generateMetadata({ params }: PageParams) {
	const votingId = (await params).votingId;
	const [voting] = await getVoting(votingId);
	const baseUrl = "https://audlect.nicodenetworks.com";
	return {
		title: voting?.name ?? "Audlect Voting",
		description: voting?.description ?? "Vote Music with your Friends, Guests and Artists",
		alternates: {
			canonical: `${baseUrl}/voting/${votingId}`,
		},
	};
}

type PageParams = {
	params: Promise<{ votingId: string }>;
};

export default async function Page({ params }: PageParams) {
	const votingId = (await params).votingId;
	const [voting] = await db.select().from(votingsTable).where(eq(votingsTable.short_id, votingId)).limit(1);

	if (!voting) {
		return (
			<div className="font-inter pt-7 lg:mt-24 flex min-h-screen flex-col">
				<NotFound reqVotingId={votingId} />
			</div>
		);
	}

	return (
		<VotingProvider
			votingId={voting.voting_id}
			votingShortId={voting.short_id}
			startsAt={voting.starts_at}
			endsAt={voting.ends_at}
		>
			<div className="flex min-h-screen flex-col">
				<VotingInfoBar />
				<VotingHeader votingTitle={voting.name} votingId={voting.voting_id} votingShortId={voting.short_id} />

				<VotingDetails votingId={voting.voting_id} name={voting.name} description={voting.description} />
				<LoginWarnProvider>
					<AudioProvider>
						<VotingLayout />
						<AudioProgressBar />
					</AudioProvider>
				</LoginWarnProvider>
				<Footer />
			</div>
		</VotingProvider>
	);
}
