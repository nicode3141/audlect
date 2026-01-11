import React from "react";
import PlaylistItems from "../PlaylistItems/PlaylistItems";
import { AnimatePresence } from "framer-motion";
import RankingItems from "../PlaylistItems/RankingItems";

interface IMainContentProps {
	voting_id: string;
	setPreviewUrl: (url: string | null) => void;
	playingSongId?: string | null;
	setPlayingSongId?: (id: string | null) => void;
	offset: number;
	limit: number;
	showRanking: boolean;
}

export default function MainContent(props: IMainContentProps) {
	const { voting_id, setPreviewUrl, playingSongId, setPlayingSongId, offset, limit, showRanking } = props;

	const direction = showRanking ? 1 : -1;
	return (
		<AnimatePresence mode="wait" custom={direction}>
			{!showRanking ? (
				<PlaylistItems
					voting_id={voting_id}
					setPreviewUrl={setPreviewUrl}
					playingSongId={playingSongId}
					setPlayingSongId={setPlayingSongId}
					offset={offset}
					limit={limit}
				/>
			) : (
				<RankingItems
					voting_id={voting_id}
					setPreviewUrl={setPreviewUrl}
					playingSongId={playingSongId}
					setPlayingSongId={setPlayingSongId}
					offset={offset}
					limit={limit}
				/>
			)}
		</AnimatePresence>
	);
}
