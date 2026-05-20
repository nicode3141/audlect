"use client";

import { AlertTriangle } from "lucide-react";
import React from "react";
import { api } from "~/trpc/react";
import VotingElement from "./VotingElement";
import VotingElementSkeleton from "./VotingElementSkeleton";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/@shadcn/alert";

export default function UserVotings() {
	const { data: ownVotings, isLoading, error } = api.votings.getOwnVotings.useQuery({ limit: 30, page: 0 });

	return (
		<div
			className="md:relative md:mx-auto md:max-w-3xl md:rounded-lg md:bg-white md:p-5 md:shadow-md md:dark:bg-stone-900
				md:top-10"
		>
			<div className="pt-4 pl-4">
				<div className="font-montserrat font-semibold text-2xl">Your Votings</div>
				<div className="font-montserrat text-gray-500 dark:text-gray-400">manage Votings</div>
			</div>
			<div className="flex flex-col gap-4 py-6 px-2">
				{isLoading && Array.from({ length: 10 }).map((_, i) => <VotingElementSkeleton key={i} />)}
				{error && (
					<Alert>
						<AlertTriangle />
						<AlertTitle>Couldn&apos;t fetch your votings</AlertTitle>
						<AlertDescription>Please try again</AlertDescription>
					</Alert>
				)}
				{!isLoading &&
					!error &&
					ownVotings?.map((voting, index) => (
						<VotingElement
							key={voting.short_id}
							shortId={voting.short_id}
							votingName={voting.name}
							votingDesc={voting.description}
							votingDate={voting.created_at}
							length={ownVotings?.length ?? 99}
							index={index}
						/>
					))}
			</div>
		</div>
	);
}
