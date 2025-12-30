"use client";

import React from "react";
import { api } from "~/trpc/react";
import VotingCard from "../VotingCard/VotingCard";
import { VotingDetails } from "~/components/layout/VotingDetails/VotingDetails";

export default function VotingItems() {
	const publicVotings = api.votings.getPublicVotings.useQuery({
		limit: 10,
		page: 0,
		sort_method: "Date Added",
	});

	return (
		<div className="flex items-center justify-center pt-[2vw]">
			<div className="flex flex-col justify-items-stretch gap-3.5 md:grid md:max-w-[80vw] md:grid-cols-2 md:flex-wrap md:gap-4 xl:grid-cols-3">
				{publicVotings.data?.map((voting) => (
					<VotingCard
						key={voting.voting_id}
						votingId={voting.voting_id}
						shortId={voting.short_id}
						title={voting.name}
						description={voting.description}
						coverImageUrl={voting.preview_image?.replace(/\/\d+x\d+-/, "/1000x1000-")}
					/>
				))}
			</div>
		</div>
	);
}
