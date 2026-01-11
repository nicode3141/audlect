import React, { useCallback, useRef, useState } from "react";
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

// Custom comparison function to prevent re-renders when metadata object reference changes but content is the same
function arePropsEqual(prevProps: ISongCardContainerProps, nextProps: ISongCardContainerProps): boolean {
	// Compare primitive props
	if (prevProps.variant !== nextProps.variant || prevProps.setPreviewUrl !== nextProps.setPreviewUrl) {
		return false;
	}

	// Only re-render if activePreview change actually affects this component
	// A component only cares if activePreview matches its own fetchedPreviewUrl
	// We can't know fetchedPreviewUrl here, so we'll be conservative:
	// Only skip re-render if activePreview is the same (null === null, or same URL)
	// This means we'll still re-render when activePreview changes, but that's necessary
	// to update playState correctly
	if (prevProps.activePreview !== nextProps.activePreview) {
		// activePreview changed - we need to re-render to update playState
		return false;
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
	const { metadata, variant, activePreview, setPreviewUrl } = props;

	const [fetchedPreviewUrl, setFetchedPreview] = useState<string | undefined>(undefined);
	const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(false);
	const [showSongInfo, setShowSongInfo, SongRef] = usePopup();
	const { liked, likes, loadingLike, handleLike } = useLikeSong(metadata);

	const query = api.deezerSearch.getTrack.useQuery({ track_id: metadata.deezer_id }, { enabled: false });

	const mergedMetadata = React.useMemo(() => ({ ...metadata, likes_total: likes, liked }), [metadata, likes, liked]);

	// Use refs to access latest values without recreating callbacks
	const activePreviewRef = useRef(activePreview);
	const fetchedPreviewUrlRef = useRef(fetchedPreviewUrl);
	const setPreviewUrlRef = useRef(setPreviewUrl);

	// Keep refs in sync
	activePreviewRef.current = activePreview;
	fetchedPreviewUrlRef.current = fetchedPreviewUrl;
	setPreviewUrlRef.current = setPreviewUrl;

	// Extract refetch to avoid depending on the entire query object
	// Use ref to store refetch to avoid dependency issues
	const refetchPreviewRef = useRef(query.refetch);
	refetchPreviewRef.current = query.refetch;

	// Stable callback that uses refs to access latest values
	const handlePlay = useCallback(async () => {
		if (activePreviewRef.current === fetchedPreviewUrlRef.current) {
			setPreviewUrlRef.current(null);
			setIsLoadingPreview(false);
		} else {
			setIsLoadingPreview(true);
			try {
				const result = await refetchPreviewRef.current();
				if (result.data?.preview) {
					setPreviewUrlRef.current(result.data.preview);
					setFetchedPreview(result.data.preview);
				}
			} finally {
				setIsLoadingPreview(false);
			}
		}
	}, []);

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
					activePreview === fetchedPreviewUrl ? "pause" : isLoadingPreview || query.isLoading ? "loading" : "play"
				}
				onPlay={handlePlayClick}
			/>
			{showSongInfo && <SongInfo showPopup={showSongInfo} ref={SongRef} metadata={metadata} />}
		</div>
	);
}, arePropsEqual);
