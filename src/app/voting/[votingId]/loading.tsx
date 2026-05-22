import { VotingDetails } from "~/features/voting/components/VotingDetails";
import SkeletonSongCard from "~/features/songs/components/SongCard/SkeletonSongCard";
import VotingHeader from "~/features/voting/components/VotingHeader";

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
