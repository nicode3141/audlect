"use client";

import React, { useEffect, useMemo, useRef } from "react";
import VotingCard from "./VotingCard/VotingCard";
import SkeletonVotingCard from "./VotingCard/SkeletonVotingCard";
import ErrorBanner from "~/shared/components/ErrorBanner";
import { usePublicVotings } from "~/features/votings/hooks/usePublicVotings";
import { Spinner } from "~/shared/ui/spinner";
import type { RouterOutputs } from "~/trpc/react";
import type { BrowseSortOptions } from "~/features/voting/components/BrowseSearch";
import AudlectTitle from "~/shared/components/AudlectTitle";
import { Loader2 } from "lucide-react";

export default function VotingItems({ sortMethod }: { sortMethod: BrowseSortOptions }) {
	const {
		data: publicVotings,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = usePublicVotings({ limit: 5, sort_method: sortMethod });

	const sentinelRef = useRef<HTMLDivElement>(null);
	const votings = useMemo(() => publicVotings?.pages.flatMap((page) => page.items) ?? [], [publicVotings]);

	const hasNextPageRef = useRef(hasNextPage);
	const isFetchingNextPageRef = useRef(isFetchingNextPage);
	const fetchNextPageRef = useRef(fetchNextPage);
	const observerRef = useRef<IntersectionObserver | null>(null);

	hasNextPageRef.current = hasNextPage;
	isFetchingNextPageRef.current = isFetchingNextPage;
	fetchNextPageRef.current = fetchNextPage;

	useEffect(() => {
		if (observerRef.current) {
			observerRef.current.disconnect();
			observerRef.current = null;
		}

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
					rootMargin: "600px",
					threshold: 0,
				},
			);

			observer.observe(sentinelRef.current);
			observerRef.current = observer;
		};

		setupObserver();

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
		<div className="flex items-center justify-center pt-[2vw] max-w-screen overflow-hidden">
			<div
				className="flex flex-col justify-items-stretch gap-3.5 md:grid md:max-w-[80vw] md:grid-cols-2 md:flex-wrap
					md:gap-4 xl:max-w-[60vw] xl:grid-cols-3 w-[90vw]"
			>
				{isLoading && (
					<div className="h-[50vh] w-[90vw] flex items-center">
						<div className="flex items-center justify-center flex-col gap-3 w-full">
							<AudlectTitle />
							<Loader2 className="animate-spin" />
						</div>
					</div>
				)}
				{error && <ErrorBanner />}
				{!isLoading &&
					!error &&
					votings.map((voting) => (
						<VotingCard
							key={voting.voting_id}
							votingId={voting.voting_id}
							shortId={voting.short_id}
							title={voting.name}
							description={voting.description}
							coverImageUrl={voting.preview_image?.replace(/\/\d+x\d+-/, "/1000x1000-")}
						/>
					))}

				<div ref={sentinelRef} className="h-1" aria-hidden="true" />

				{isFetchingNextPage && (
					<div className="col-span-full flex justify-center py-4">
						<Spinner />
					</div>
				)}

				{!isLoading && !hasNextPage && votings.length > 0 && (
					<div className="col-span-full text-center py-4 font-inter dark:text-gray-300">You have reached the end.</div>
				)}
			</div>
		</div>
	);
}

export function SearchResultVotings({
	searchResults,
}: {
	searchResults: RouterOutputs["search"]["searchPublicVotings"];
}) {
	return (
		<div className="flex items-center justify-center pt-[2vw] max-w-screen overflow-hidden">
			<div
				className="flex flex-col justify-items-stretch gap-3.5 md:grid md:max-w-[80vw] md:grid-cols-2 md:flex-wrap
					md:gap-4 xl:max-w-[60vw] xl:grid-cols-3 w-[90vw]"
			>
				{searchResults?.items.map((voting) => (
					<VotingCard
						key={voting.voting_id}
						votingId={voting.voting_id}
						shortId={voting.short_id}
						title={voting.name}
						description={voting.description}
						coverImageUrl={voting.preview_image?.replace(/\/\d+x\d+-/, "/1000x1000-")}
					/>
				))}
			</div>
		</div>
	);
}
