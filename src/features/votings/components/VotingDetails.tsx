import { VotingSubitle, VotingTitle } from "~/features/voting/components/VotingTitle";
import AudlectHeader from "~/shared/components/AudlectHeader";

interface IVotingDetails {
	votingId: string | null;
	name: string;
	description: string;
}

export async function VotingDetails(props: IVotingDetails) {
	const { name, description } = props;

	return (
		<>
			<div className={"VotingDetails font-inter pt-7"}>
				<AudlectHeader headerTitle={"Audlect"} />
				<VotingTitle>{name}</VotingTitle>
				<VotingSubitle>{description}</VotingSubitle>
			</div>
		</>
	);
}
