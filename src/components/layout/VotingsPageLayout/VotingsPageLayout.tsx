import React from "react";
import { VotingDetails } from "../VotingDetails/VotingDetails";
import VotingItems from "~/features/votings/VotingItems/VotingItems";
import NewVotingButton from "~/features/votings/NewVotingButton/NewVotingButton";

export default function VotingsPageLayout() {
	return (
		<div>
			<VotingDetails votingId={null} name={"Browse Votings"} description={"Active votings on Audlect"} />
			<VotingItems />
			<div className="fixed right-0 bottom-0 z-10 flex items-center justify-center p-10">
				<NewVotingButton />
			</div>
		</div>
	);
}
