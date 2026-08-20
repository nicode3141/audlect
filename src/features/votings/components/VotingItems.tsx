"use client";

import React from "react";
import VotingCard from "./VotingCard/VotingCard";
import SkeletonVotingCard from "./VotingCard/SkeletonVotingCard";
import ErrorBanner from "~/shared/components/ErrorBanner";
import AudlectTitle from "~/shared/components/AudlectTitle";
import { Loader2 } from "lucide-react";
import { api, type RouterOutputs } from "~/trpc/react";
import type { BrowseSortOptions } from "~/features/voting/components/BrowseSearch";

export default function VotingItems({ sortMethod }: { sortMethod: BrowseSortOptions }) {
	const {
		data: publicVotings,
		isLoading,
		error,
	} = api.votings.getPublicVotings.useQuery({
		limit: 100,
		page: 0,
		sort_method: sortMethod,
	});

	return (
		<div className="flex items-center justify-center pt-[2vw] max-w-screen overflow-hidden">
			<div
				className="flex flex-col justify-items-stretch gap-3.5 md:grid md:max-w-[80vw] md:grid-cols-2 md:flex-wrap
					md:gap-4 xl:max-w-[60vw] xl:grid-cols-3 w-[90vw]"
			>
				{isLoading && (
					<div className="h-[50vh] w-[90vw] flex items-center">
						<div className="flex items-center justify-center flex-col gap-3 w-full">
							<AudlectTitle />
							<Loader2 className="animate-spin" />
						</div>
					</div>
				)}
				{!isLoading &&
					!error &&
					publicVotings?.items.map((voting) => (
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

export function SearchResultVotings({
	searchResults,
}: {
	searchResults: RouterOutputs["search"]["searchPublicVotings"];
}) {
	return (
		<div className="flex items-center justify-center pt-[2vw] max-w-screen overflow-hidden">
			<div
				className="flex flex-col justify-items-stretch gap-3.5 md:grid md:max-w-[80vw] md:grid-cols-2 md:flex-wrap
					md:gap-4 xl:max-w-[60vw] xl:grid-cols-3 w-[90vw]"
			>
				{searchResults?.items.map((voting) => (
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
