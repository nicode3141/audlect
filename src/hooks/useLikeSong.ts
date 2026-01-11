import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { api } from "~/trpc/react";
import type { TSongMetadata } from "~/types/songs";
import { useRequireLogin } from "./useRequireLogin";

export function useLikeSong(metadata: TSongMetadata) {
	const [likes, setLikes] = useState<number>(metadata.likes_total!);
	const [liked, setLiked] = useState<boolean>(metadata.liked as boolean);
	const [loadingLike, setIsLoadingLike] = useState<boolean>(false);
	const { requireLogin } = useRequireLogin();

	useEffect(() => {
		setLiked(metadata.liked as boolean);
		setLikes(metadata.likes_total ?? 0);
	}, [metadata.liked, metadata.likes_total]);

	const likeMutation = api.likes.like.useMutation({
		onMutate: () => {
			setLiked(true);
			setLikes((prev) => prev + 1);
			setIsLoadingLike(true);
		},
		onError: () => {
			setLiked(false);
			setLikes((prev) => prev - 1);
			setIsLoadingLike(false);
		},
		onSettled: (data) => {
			if (data?.likes_total === undefined || data?.liked === undefined) {
				setLiked(false);
				setIsLoadingLike(false);
				return;
			}

			setLikes(data.likes_total);
			setLiked(data.liked as boolean);
			setIsLoadingLike(false);
		},
	});

	const unlikeMutation = api.likes.unlike.useMutation({
		onMutate: () => {
			setLiked(false);
			setLikes((prev) => prev - 1);
			setIsLoadingLike(true);
		},
		onError: () => {
			setLiked(true);
			setLikes((prev) => prev + 1);
			setIsLoadingLike(false);
		},
		onSettled: (data) => {
			if (data?.likes_total === undefined || data?.liked === undefined) {
				setLiked(true);
				setIsLoadingLike(false);
				return;
			}

			setLikes(data.likes_total);
			setLiked(data.liked as boolean);
			setIsLoadingLike(false);
		},
	});

	interface IHandleLike {
		song_id: string | undefined;
		voting_id: string | undefined;
	}

	// Use refs to access latest values without recreating callback
	const likedRef = useRef(liked);
	const metadataRef = useRef(metadata);
	const requireLoginRef = useRef(requireLogin);
	const likeMutationRef = useRef(likeMutation);
	const unlikeMutationRef = useRef(unlikeMutation);

	// Keep refs in sync
	likedRef.current = liked;
	metadataRef.current = metadata;
	requireLoginRef.current = requireLogin;
	likeMutationRef.current = likeMutation;
	unlikeMutationRef.current = unlikeMutation;

	const handleLike = useCallback(({ song_id, voting_id }: IHandleLike) => {
		void requireLoginRef.current(() => {
			if (song_id === undefined || voting_id === undefined) return;
			if (likedRef.current) {
				unlikeMutationRef.current.mutate({
					song_id: metadataRef.current.song_id ?? "",
					voting_id: metadataRef.current.voting_id,
				});
			} else {
				likeMutationRef.current.mutate({
					song_id: metadataRef.current.song_id ?? "",
					voting_id: metadataRef.current.voting_id,
				});
			}
		});
	}, []);

	return { liked, likes, loadingLike, handleLike, setLiked, setLikes };
}
