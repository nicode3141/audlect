"use server";

import { VotingSubitle, VotingTitle } from "~/features/voting/components/VotingTitle";

interface IVotingDetails {
	votingId: string | null;
	name: string;
	description: string;
}

export async function VotingDetails(props: IVotingDetails) {
	const { name, description } = props;

	return (
		<>
			<div className={"VotingDetails font-inter pt-7 lg:mt-24"}>
				<VotingTitle>{name}</VotingTitle>
				<VotingSubitle>{description}</VotingSubitle>
			</div>
		</>
	);
}
