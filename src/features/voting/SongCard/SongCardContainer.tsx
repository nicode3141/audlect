import React, { useEffect, useState } from "react";
import SongCard from "./SongCard";
import type { TSongMetadata } from "~/types/songs";
import { api } from "~/trpc/react";
import { nop } from "~/lib/utils";
import SongInfo from "./SongInfo";
import { usePopup } from "~/hooks/usePopup";
import { useRequireLogin } from "~/hooks/useRequireLogin";

interface ISongCardContainerProps {
	metadata: TSongMetadata;
	variant: "playlist" | "search";
	activePreview?: string | null;
	setPreviewUrl: (url: string | null) => void;
}

export default function SongCardContainer(props: ISongCardContainerProps) {
	const { metadata, variant, activePreview, setPreviewUrl } = props;

	const [likes, setLikes] = useState<number>(metadata.likes_total!);
	const [liked, setLiked] = useState<boolean>(metadata.liked as boolean);
	const [loadingLike, setIsLoadingLike] = useState<boolean>(false);
	const [fetchedPreviewUrl, setFetchedPreview] = useState<string | undefined>(undefined);
	const [showSongInfo, setShowSongInfo, SongRef] = usePopup();
	const { requireLogin } = useRequireLogin();

	const query = api.deezerSearch.getTrack.useQuery({ track_id: metadata.deezer_id }, { enabled: false });

	useEffect(() => {
		setLiked(metadata.liked as boolean);
	}, [metadata.liked, metadata.likes_total]);

	const likeMutation = api.likes.like.useMutation({
		onMutate: () => {
			const likesBefore = likes;
			setLiked(true);
			setLikes((prev) => prev + 1);
			setIsLoadingLike(true);

			return { likesBefore };
		},
		onError: (err, vars, ctx) => {
			setLiked(false);
			setLikes(ctx?.likesBefore ?? likes);
			setIsLoadingLike(false);
		},
		onSettled: (data, err, vars, ctx) => {
			if (data?.likes_total === undefined || data?.liked === undefined) {
				setLiked(false);
				setLikes(ctx?.likesBefore ?? likes);
				setIsLoadingLike(false);
				return;
			}

			setLikes(data?.likes_total);
			setLiked(data?.liked as boolean);
			setIsLoadingLike(false);
		},
	});

	const unlikeMutation = api.likes.unlike.useMutation({
		onMutate: () => {
			const likesBefore = likes;
			setLiked(false);
			setLikes((prev) => prev - 1);
			setIsLoadingLike(true);

			return { likesBefore };
		},
		onError: (err, vars, ctx) => {
			setLiked(false);
			setLikes(ctx?.likesBefore ?? likes);
			setIsLoadingLike(false);
		},
		onSettled: (data, err, vars, ctx) => {
			if (data?.likes_total === undefined || data?.liked === undefined) {
				setLiked(false);
				setLikes(ctx?.likesBefore ?? likes);
				setIsLoadingLike(false);
				return;
			}

			setLikes(data?.likes_total);
			setLiked(data?.liked as boolean);
			setIsLoadingLike(false);
		},
	});

	interface IHandleLike {
		song_id: string | undefined;
		voting_id: string | undefined;
	}

	function handleLike({ song_id, voting_id }: IHandleLike) {
		requireLogin(() => {
			if (song_id === undefined || voting_id === undefined) return;
			if (liked) {
				unlikeMutation.mutate({
					song_id: metadata.song_id ?? "",
					voting_id: metadata.voting_id,
				});
			} else {
				likeMutation.mutate({
					song_id: metadata.song_id ?? "",
					voting_id: metadata.voting_id,
				});
			}
		});
	}

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
				onMore={() => setShowSongInfo?.(true)}
				isLoadingLike={loadingLike}
				isLoadingAdd={false}
				playState={activePreview === fetchedPreviewUrl ? "pause" : query.isLoading ? "loading" : "play"}
				onPlay={() => handlePlay()}
			/>
			<SongInfo showPopup={showSongInfo} ref={SongRef} metadata={metadata} />
		</div>
	);
}
