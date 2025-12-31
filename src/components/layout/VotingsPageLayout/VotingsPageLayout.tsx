import React from "react";
import { VotingDetails } from "../VotingDetails/VotingDetails";
import VotingItems from "~/features/votings/VotingItems/VotingItems";

export default function VotingsPageLayout() {
	return (
		<div>
			<VotingDetails votingId={null} name={"Browse Votings"} description={"Active votings on Audlect"} />
			<VotingItems />
		</div>
	);
}
