"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useSongs } from "~/hooks/useSongs";
import SkeletonSongCard from "../SongCard/SkeletonSongCard";
import SongCardContainer from "../SongCard/SongCardContainer";
import { useVoting } from "~/context/VotingContext";
import { useQueryParams } from "~/hooks/useQueryParams";
import ErrorBanner from "~/components/ui/ErrorBanner/ErrorBanner";
import { Spinner } from "~/components/ui/@shadcn/spinner";
import InfiniteScroll from "react-infinite-scroll-component";

interface IPlaylistItemProps {
	voting_id: string;
	activePreview: string | null;
	setPreviewUrl: (url: string | null) => void;
	offset: number;
	limit: number;
}

export default function PlaylistItems(props: IPlaylistItemProps) {
	const { votingId } = useVoting();
	const { sortMethod } = useQueryParams();
	const { activePreview, setPreviewUrl, offset, limit } = props;
	const {
		data: paginatedSongs,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useSongs({
		limit,
		offset,
		sort_method: sortMethod,
		voting_id: votingId,
	});

	const scrollRef = useRef<HTMLDivElement>(null);
	const songs = useMemo(() => paginatedSongs?.pages.flatMap((page) => page.items) ?? [], [paginatedSongs]);

	useEffect(() => {
		let timeout: NodeJS.Timeout | null = null;

		const handleScroll = () => {
			if (timeout) return;
			timeout = setTimeout(() => {
				timeout = null;
				if (!hasNextPage || isFetchingNextPage) return;
				const scrollPosition = window.scrollY + window.innerHeight;
				const bottomThreshold = document.body.offsetHeight - 600;
				if (scrollPosition >= bottomThreshold) {
					void fetchNextPage();
				}
			}, 200);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	return (
		<div ref={scrollRef} className="flex flex-col items-center justify-center gap-3.5">
			{isLoading && Array.from({ length: 10 }).map((_, i) => <SkeletonSongCard key={i} />)}

			{error && <ErrorBanner />}
			{!isLoading && !error && songs?.length === 0 && (
				<div className="font-inter flex min-h-[30vh] flex-col items-center justify-center pt-2 text-center font-semibold text-balance">
					<span className="text-xl text-[#758BFD]">This voting has no songs yet</span>
					<span className="max-w-[80vw] text-sm text-gray-700">Add songs using the Search to get started</span>
				</div>
			)}
			{!isLoading &&
				!error &&
				songs?.map((items) => (
					<SongCardContainer
						key={items.isrc}
						metadata={{
							song_id: items.song_id,
							deezer_id: items.deezer_id,
							isrc: items.isrc ?? undefined,
							voting_id: votingId,
							song_name: items.song_name ?? "Loading",
							song_artists: items.song_artists ?? "Loading",
							cover_image: items.cover_image ?? undefined,
							added_by: items.added_by,
							likes_total: items.likes_total,
							liked: items.liked,
						}}
						variant="playlist"
						activePreview={activePreview}
						setPreviewUrl={setPreviewUrl}
					/>
				))}

			{isFetchingNextPage && <Spinner />}

			{!hasNextPage && <div className="font-inter pt-1 dark:text-gray-300">You have reached the end.</div>}
		</div>
	);
}
