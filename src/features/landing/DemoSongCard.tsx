"use client";

import React, { useCallback, useRef, useState } from "react";
import SongCard from "../voting/components/SongCard/SongCard";
import { useAudio } from "../voting/context/AudioContext";
import { api } from "~/trpc/react";
import type { TSongMetadata } from "~/types/songs";

interface DemoSongCardProps {
	metadata: TSongMetadata;
	liked?: boolean;
	onLike?: () => void;
}

export default function DemoSongCard({ metadata, liked, onLike }: DemoSongCardProps) {
	const { playSong, stop, currentSongId, isPlaying } = useAudio();
	const [isLoadingPreview, setIsLoadingPreview] = useState(false);

	const query = api.deezerSearch.getTrack.useQuery({ track_id: metadata.deezer_id }, { enabled: false });

	const isThisSongPlaying = currentSongId === (metadata.song_id ?? metadata.deezer_id.toString());

	const queryRef = useRef(query.refetch);
	queryRef.current = query.refetch;

	const metadataRef = useRef(metadata);
	metadataRef.current = metadata;

	const playSongRef = useRef(playSong);
	playSongRef.current = playSong;

	const stopRef = useRef(stop);
	stopRef.current = stop;

	const isThisSongPlayingRef = useRef(isThisSongPlaying);
	isThisSongPlayingRef.current = isThisSongPlaying;

	const handlePlay = useCallback(async () => {
		if (isThisSongPlayingRef.current) {
			stopRef.current();
			setIsLoadingPreview(false);
		} else {
			setIsLoadingPreview(true);
			try {
				const result = await queryRef.current();
				if (result.data?.preview) {
					const m = metadataRef.current;
					playSongRef.current({
						songId: m.song_id ?? m.deezer_id.toString(),
						title: m.song_name,
						artists: m.song_artists,
						cover: m.cover_image,
						previewUrl: result.data.preview,
					});
				}
			} finally {
				setIsLoadingPreview(false);
			}
		}
	}, []);

	const handlePlayClick = useCallback(() => {
		void handlePlay();
	}, [handlePlay]);

	const playState = isThisSongPlaying
		? isPlaying
			? "pause"
			: "play"
		: isLoadingPreview
			? "loading"
			: "play";

	return (
		<SongCard
			metadata={metadata}
			added={true}
			liked={liked}
			onLike={onLike}
			playState={playState}
			onPlay={handlePlayClick}
		/>
	);
}
