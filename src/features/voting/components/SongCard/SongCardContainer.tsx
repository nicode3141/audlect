import React, { useCallback, useRef, useState } from "react";
import SongCard from "./SongCard";
import type { TSongMetadata } from "~/types/songs";
import { api } from "~/trpc/react";
import { nop } from "~/shared/utils/utils";
import SongInfo from "./SongInfo";
import { usePopup } from "~/shared/hooks/usePopup";
import { useLikeSong } from "~/features/voting/hooks/useLikeSong";
import type { AudioContent } from "~/features/voting/context/AudioContext";

interface ISongCardContainerProps {
	metadata: TSongMetadata;
	variant: "playlist" | "search";
	playingSongId?: string | null;
	onPlaySong: (song: AudioContent) => void;
	onStop: () => void;
}

// Custom comparison function to prevent re-renders when metadata object reference changes but content is the same
function arePropsEqual(prevProps: ISongCardContainerProps, nextProps: ISongCardContainerProps): boolean {
	// Compare primitive props
	if (prevProps.variant !== nextProps.variant) {
		return false;
	}

	// Only re-render when playingSongId change affects this component.
	if (prevProps.playingSongId !== nextProps.playingSongId) {
		const prevActiveForThis = prevProps.playingSongId === prevProps.metadata.song_id;
		const nextActiveForThis = nextProps.playingSongId === nextProps.metadata.song_id;
		if (prevActiveForThis || nextActiveForThis) {
			return false;
		}
	}

	// Deep compare metadata object
	const prev = prevProps.metadata;
	const next = nextProps.metadata;
	return (
		prev.song_id === next.song_id &&
		prev.deezer_id === next.deezer_id &&
		prev.isrc === next.isrc &&
		prev.voting_id === next.voting_id &&
		prev.song_name === next.song_name &&
		prev.song_artists === next.song_artists &&
		prev.cover_image === next.cover_image &&
		prev.added_by === next.added_by &&
		prev.likes_total === next.likes_total &&
		prev.liked === next.liked
	);
}

export default React.memo(function SongCardContainer(props: ISongCardContainerProps) {
	const { metadata, variant, playingSongId, onPlaySong, onStop } = props;

	const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(false);
	const [showSongInfo, setShowSongInfo, SongRef] = usePopup();
	const { liked, likes, loadingLike, handleLike } = useLikeSong(metadata);

	const query = api.deezerSearch.getTrack.useQuery({ track_id: metadata.deezer_id }, { enabled: false });

	const mergedMetadata = React.useMemo(() => ({ ...metadata, likes_total: likes, liked }), [metadata, likes, liked]);

	const playingSongIdRef = useRef(playingSongId);
	playingSongIdRef.current = playingSongId;

	const refetchPreviewRef = useRef(query.refetch);
	refetchPreviewRef.current = query.refetch;

	const onPlaySongRef = useRef(onPlaySong);
	onPlaySongRef.current = onPlaySong;

	const onStopRef = useRef(onStop);
	onStopRef.current = onStop;

	const handlePlay = useCallback(async () => {
		if (playingSongIdRef.current === metadata.song_id) {
			onStopRef.current();
			setIsLoadingPreview(false);
		} else {
			setIsLoadingPreview(true);
			try {
				const result = await refetchPreviewRef.current();
				if (result.data?.preview) {
					onPlaySongRef.current({
						songId: metadata.song_id ?? metadata.deezer_id.toString(),
						title: metadata.song_name,
						artists: metadata.song_artists,
						cover: metadata.cover_image,
						previewUrl: result.data.preview,
					});
				}
			} finally {
				setIsLoadingPreview(false);
			}
		}
	}, [metadata.song_id, metadata.deezer_id, metadata.song_name, metadata.song_artists, metadata.cover_image]);

	const handlePlayClick = useCallback(() => {
		void handlePlay();
	}, [handlePlay]);

	// Use ref for metadata to stabilize callback
	const metadataRef = useRef(metadata);
	metadataRef.current = metadata;

	const handleLikeClick = useCallback(() => {
		handleLike({ song_id: metadataRef.current.song_id, voting_id: metadataRef.current.voting_id });
	}, [handleLike]);

	const handleAddClick = useCallback(() => nop, []);

	// setShowSongInfo is a state setter and should be stable, but use functional update to be safe
	const handleMoreClick = useCallback(() => {
		setShowSongInfo((prev) => !prev);
	}, [setShowSongInfo]);

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
				playState={
					playingSongId === metadata.song_id ? "pause" : isLoadingPreview || query.isLoading ? "loading" : "play"
				}
				onPlay={handlePlayClick}
			/>
			{showSongInfo && <SongInfo showPopup={showSongInfo} ref={SongRef} metadata={metadata} />}
		</div>
	);
}, arePropsEqual);
