import { useEffect, useState } from "react";
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
		void requireLogin(() => {
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

	return { liked, likes, loadingLike, handleLike, setLiked, setLikes };
}
