import React, { useCallback, useState } from "react";
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

export default React.memo(function SongCardContainer(props: ISongCardContainerProps) {
	const { metadata, variant, activePreview, setPreviewUrl } = props;

	const [fetchedPreviewUrl, setFetchedPreview] = useState<string | undefined>(undefined);
	const [showSongInfo, setShowSongInfo, SongRef] = usePopup();
	const { liked, likes, loadingLike, handleLike } = useLikeSong(metadata);

	const query = api.deezerSearch.getTrack.useQuery({ track_id: metadata.deezer_id }, { enabled: false });

	const mergedMetadata = React.useMemo(() => ({ ...metadata, likes_total: likes, liked }), [metadata, likes, liked]);

	const handlePlay = useCallback(async () => {
		if (activePreview === fetchedPreviewUrl) {
			setPreviewUrl(null);
		} else {
			const result = await query.refetch();
			if (result.data?.preview) setPreviewUrl(result.data.preview);
			setFetchedPreview(result.data?.preview);
		}
	}, [activePreview, fetchedPreviewUrl, query, setPreviewUrl]);

	const handlePlayClick = useCallback(() => {
		void handlePlay();
	}, [handlePlay]);

	const handleLikeClick = useCallback(
		() => handleLike({ song_id: metadata.song_id, voting_id: metadata.voting_id }),
		[metadata.song_id, metadata.voting_id, handleLike],
	);

	const handleAddClick = useCallback(() => nop, []);

	const handleMoreClick = useCallback(() => setShowSongInfo?.((prev) => !prev), [setShowSongInfo]);

	return (
		<div className="relative inline-block">
			<SongCard
				metadata={mergedMetadata}
				liked={liked}
				added={variant !== "search"}
				addedSearchResult={false}
				onLike={handleLikeClick}
				onAdd={handleAddClick}
				onMore={handleMoreClick}
				isLoadingLike={loadingLike}
				isLoadingAdd={false}
				playState={activePreview === fetchedPreviewUrl ? "pause" : query.isLoading ? "loading" : "play"}
				onPlay={handlePlayClick}
			/>
			<SongInfo showPopup={showSongInfo} ref={SongRef} metadata={metadata} />
		</div>
	);
});
