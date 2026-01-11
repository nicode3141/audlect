"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useSongs } from "~/hooks/useSongs";
import SkeletonSongCard from "../SongCard/SkeletonSongCard";
import SongCardContainer from "../SongCard/SongCardContainer";
import { useVoting } from "~/context/VotingContext";
import { useQueryParams } from "~/hooks/useQueryParams";
import ErrorBanner from "~/components/ui/ErrorBanner/ErrorBanner";
import { Spinner } from "~/components/ui/@shadcn/spinner";
import RankCardContainer from "../SongCard/RankCardContainer";

interface IRankingItemsProps {
	voting_id: string;
	setPreviewUrl: (url: string | null) => void;
	playingSongId?: string | null;
	setPlayingSongId?: (id: string | null) => void;
	offset: number;
	limit: number;
}

export default function RankingItems(props: IRankingItemsProps) {
	const { votingId } = useVoting();
	const { sortMethod } = useQueryParams();
	const { setPreviewUrl, playingSongId, setPlayingSongId, offset, limit } = props;
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
	const sentinelRef = useRef<HTMLDivElement>(null);
	const songs = useMemo(() => paginatedSongs?.pages.flatMap((page) => page.items) ?? [], [paginatedSongs]);

	// Memoize metadata objects to prevent unnecessary re-renders
	const memoizedSongs = useMemo(() => {
		return songs.map((items) => ({
			metadata: {
				song_id: items.song_id,
				deezer_id: items.deezer_id,
				isrc: items.isrc ?? undefined,
				voting_id: votingId,
				song_name: items.song_name ?? "Loading",
				song_artists: items.song_artists ?? "Loading",
				cover_image: items.cover_image ?? undefined,
				rank: items.rank,
				added_by: items.added_by,
				likes_total: items.likes_total,
				liked: items.liked,
			},
			key: items.isrc,
		}));
	}, [songs, votingId]);

	// Use IntersectionObserver instead of scroll events - much more performant
	// Use refs to avoid recreating observer when dependencies change
	const hasNextPageRef = useRef(hasNextPage);
	const isFetchingNextPageRef = useRef(isFetchingNextPage);
	const fetchNextPageRef = useRef(fetchNextPage);
	const observerRef = useRef<IntersectionObserver | null>(null);

	// Keep refs in sync
	hasNextPageRef.current = hasNextPage;
	isFetchingNextPageRef.current = isFetchingNextPage;
	fetchNextPageRef.current = fetchNextPage;

	useEffect(() => {
		// Clean up existing observer if it exists
		if (observerRef.current) {
			observerRef.current.disconnect();
			observerRef.current = null;
		}

		// Wait for sentinel to be available
		const setupObserver = () => {
			if (!sentinelRef.current) return;

			const observer = new IntersectionObserver(
				(entries) => {
					const [entry] = entries;
					if (entry?.isIntersecting && hasNextPageRef.current && !isFetchingNextPageRef.current) {
						void fetchNextPageRef.current();
					}
				},
				{
					root: null,
					rootMargin: "600px", // Trigger 600px before the sentinel comes into view
					threshold: 0,
				},
			);

			observer.observe(sentinelRef.current);
			observerRef.current = observer;
		};

		// Try to set up immediately
		setupObserver();

		// If sentinel isn't ready, try again after a short delay
		if (!sentinelRef.current) {
			const timeoutId = setTimeout(setupObserver, 0);
			return () => {
				clearTimeout(timeoutId);
				if (observerRef.current) {
					observerRef.current.disconnect();
					observerRef.current = null;
				}
			};
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
				observerRef.current = null;
			}
		};
	}, []);

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
				memoizedSongs.map(({ metadata, key }) => (
					<RankCardContainer
						key={key}
						metadata={metadata}
						variant="playlist"
						setPreviewUrl={setPreviewUrl}
						playingSongId={playingSongId}
						setPlayingSongId={setPlayingSongId}
					/>
				))}

			{/* Sentinel element for IntersectionObserver */}
			<div ref={sentinelRef} className="h-1" aria-hidden="true" />

			{isFetchingNextPage && <Spinner />}

			{!hasNextPage && <div className="font-inter pt-1 dark:text-gray-300">You have reached the end.</div>}
		</div>
	);
}
