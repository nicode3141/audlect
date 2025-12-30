import React from "react";
import { VotingDetails } from "../VotingDetails/VotingDetails";
import VotingItems from "~/features/votings/VotingItems/VotingItems";

export default function VotingsPageLayout() {
	return (
		<div>
			<VotingDetails votingId={null} name={"Public Votings"} description={"active votings on Audlect"} />
			<VotingItems />
		</div>
	);
}
