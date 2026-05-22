import React, { useCallback, useState } from "react";
import SongCard from "./SongCard";
import type { TSongMetadata } from "~/types/songs";
import { nop } from "~/shared/utils/utils";
import { api } from "~/trpc/react";
import { usePopup } from "~/shared/hooks/usePopup";
import SongInfo from "./SongInfo";
import { useLikeSong } from "~/features/songs/hooks/useLikeSong";

interface ISearchCardProps {
	metadata: TSongMetadata;
	addedSong: boolean;
	setPreviewUrl: (url: string | null) => void;
	playingSongId?: string | null;
	setPlayingSongId?: (id: string | null) => void;
}

export default function SearchCardContainer(props: ISearchCardProps) {
	const { metadata, addedSong, setPreviewUrl, setPlayingSongId, playingSongId } = props;

	const [loadingAdd, setIsLoadingAdd] = useState<boolean>(false);
	const [added, setAdded] = useState<boolean>(addedSong);
	const [successfullAdded, setSuccessfulAdded] = useState<boolean>(false);
	const [showSongInfo, setShowSongInfo, SongRef] = usePopup();
	const { liked, likes, loadingLike, handleLike, setLiked, setLikes } = useLikeSong(metadata);

	const addMutation = api.songs.addSongID.useMutation({
		onMutate: () => {
			setAdded(true);
			setIsLoadingAdd(true);
		},
		onError: () => {
			//display error message
			setAdded(false);
			setIsLoadingAdd(false);
		},
		onSuccess: (data) => {
			setAdded(true);
			setIsLoadingAdd(false);
			metadata.song_id = data?.song_id;
			metadata.added_by = data?.added_by;
			setSuccessfulAdded(true);
			setLiked(false);
			setLikes(0);
		},
	});

	interface IHandleAdd {
		song_id: number;
		voting_id: string;
	}

	function handleAdd({ song_id, voting_id }: IHandleAdd) {
		if (song_id === undefined || voting_id === undefined) return;
		if (!added) {
			addMutation.mutate({
				id: song_id,
				voting_id: voting_id,
			});
		} else {
			nop();
		}
	}

	function handleRemove() {
		setSuccessfulAdded(false);
		setAdded(false);
	}

	const handlePlay = useCallback(() => {
		if (playingSongId === metadata.deezer_id.toString()) {
			setPreviewUrl(null);
			setPlayingSongId?.(null);
		} else {
			setPreviewUrl(metadata.preview_url!);
			setPlayingSongId?.(metadata.deezer_id.toString() ?? null);
			console.log(metadata.deezer_id.toString());
		}
	}, [metadata.preview_url, metadata.deezer_id, playingSongId, setPlayingSongId, setPreviewUrl]);

	const handlePlayClick = useCallback(() => {
		void handlePlay();
	}, [handlePlay]);

	return (
		<div className="relative inline-block">
			<SongCard
				metadata={{ ...metadata, likes_total: likes, liked: liked }}
				onPlay={handlePlayClick}
				added={successfullAdded}
				addedSearchResult={added}
				onAdd={() =>
					handleAdd({
						song_id: metadata.deezer_id,
						voting_id: metadata.voting_id,
					})
				}
				liked={liked}
				isLoadingLike={loadingLike}
				onLike={() =>
					successfullAdded &&
					metadata.song_id &&
					handleLike({ song_id: metadata.song_id, voting_id: metadata.voting_id })
				}
				onMore={() => setShowSongInfo(true)}
				isLoadingAdd={loadingAdd}
				playState={playingSongId === metadata.deezer_id.toString() ? "pause" : "play"}
			/>
			<SongInfo showPopup={showSongInfo} ref={SongRef} metadata={metadata} onRemove={handleRemove} />
		</div>
	);
}
