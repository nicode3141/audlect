import React from "react";
import PlaylistItems from "../../voting/components/PlaylistItems";
import type { AudioContent } from "~/features/voting/context/AudioContext";

interface IMainContentProps {
	voting_id: string;
	playingSongId?: string | null;
	onPlaySong: (song: AudioContent) => void;
	onStop: () => void;
	offset: number;
	limit: number;
}

export default function MainContent(props: IMainContentProps) {
	const { voting_id, playingSongId, onPlaySong, onStop, offset, limit } = props;
	return (
		<PlaylistItems
			voting_id={voting_id}
			playingSongId={playingSongId}
			onPlaySong={onPlaySong}
			onStop={onStop}
			offset={offset}
			limit={limit}
		/>
	);
}
