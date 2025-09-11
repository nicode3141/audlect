import React, { useState } from "react";
import SongCard from "./SongCard";
import type { TSongMetadata } from "~/types/songs";
import { api } from "~/trpc/react";
import { nop } from "~/lib/utils";
import SongInfo from "./SongInfo";
import { usePopup } from "~/hooks/usePopup";
import { useLikeSong } from "~/hooks/useLikeSong";


interface ISongCardContainerProps {
	metadata: TSongMetadata;
	variant: "playlist" | "search";
	activePreview?: string | null;
	setPreviewUrl: (url: string | null) => void;
}

export default function SongCardContainer(props: ISongCardContainerProps) {
	const { metadata, variant, activePreview, setPreviewUrl } = props;

	const [fetchedPreviewUrl, setFetchedPreview] = useState<string | undefined>(undefined);
	const [showSongInfo, setShowSongInfo, SongRef] = usePopup();
	const { liked, likes, loadingLike, handleLike } = useLikeSong(metadata);

	const query = api.deezerSearch.getTrack.useQuery({ track_id: metadata.deezer_id }, { enabled: false });


	async function handlePlay() {
		if (activePreview === fetchedPreviewUrl) {
			setPreviewUrl(null);
		} else {
			const result = await query.refetch();
			if (result.data?.preview) setPreviewUrl(result.data.preview);
			setFetchedPreview(result.data?.preview);
		}
	}

	return (
		<div className="relative inline-block">
			<SongCard
				metadata={{ ...metadata, likes_total: likes, liked: liked }}
				liked={liked}
				added={variant !== "search"}
				addedSearchResult={false}
				onLike={() => handleLike({ song_id: metadata.song_id, voting_id: metadata.voting_id })}
				onAdd={() => nop()}
				onMore={() => setShowSongInfo?.((prev) => !prev)}
				isLoadingLike={loadingLike}
				isLoadingAdd={false}
				playState={activePreview === fetchedPreviewUrl ? "pause" : query.isLoading ? "loading" : "play"}
				onPlay={() => handlePlay()}
			/>
			<SongInfo showPopup={showSongInfo} ref={SongRef} metadata={metadata} />
		</div>
	);
}
