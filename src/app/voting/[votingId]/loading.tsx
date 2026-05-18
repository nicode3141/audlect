import { VotingDetails } from "~/components/layout/VotingDetails/VotingDetails";
import SkeletonSongCard from "~/features/voting-site/SongCard/SkeletonSongCard";
import VotingHeader from "~/features/voting-site/VotingHeader/VotingHeader";

export default function Loading() {
	return (
		<>
			<VotingHeader votingTitle={"Loading Voting"} />
			<VotingDetails votingId={""} name="Loading..." description={"Loading..."} />
			<div className="flex flex-col items-center justify-center gap-3.5 pt-15">
				{Array.from({ length: 10 }).map((_, i) => (
					<SkeletonSongCard key={i} />
				))}
			</div>
		</>
	);
}
