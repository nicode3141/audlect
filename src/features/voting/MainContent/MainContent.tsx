import React from "react";
import PlaylistItems from "../PlaylistItems/PlaylistItems";

interface IMainContentProps {
	voting_id: string;
	setPreviewUrl: (url: string | null) => void;
	playingSongId?: string | null;
	setPlayingSongId?: (id: string | null) => void;
	offset: number;
	limit: number;
}

export default function MainContent(props: IMainContentProps) {
	const { voting_id, setPreviewUrl, playingSongId, setPlayingSongId, offset, limit } = props;
	return (
		<PlaylistItems
			voting_id={voting_id}
			setPreviewUrl={setPreviewUrl}
			playingSongId={playingSongId}
			setPlayingSongId={setPlayingSongId}
			offset={offset}
			limit={limit}
		/>
	);
}
