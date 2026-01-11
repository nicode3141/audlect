import React from "react";
import PlaylistItems from "../PlaylistItems/PlaylistItems";

interface IMainContentProps {
	voting_id: string;
	activePreview: string | null;
	setPreviewUrl: (url: string | null) => void;
	offset: number;
	limit: number;
}

export default function MainContent(props: IMainContentProps) {
	const { voting_id, activePreview, setPreviewUrl, offset, limit } = props;
	return (
		<PlaylistItems
			voting_id={voting_id}
			activePreview={activePreview}
			setPreviewUrl={setPreviewUrl}
			offset={offset}
			limit={limit}
		/>
	);
}
