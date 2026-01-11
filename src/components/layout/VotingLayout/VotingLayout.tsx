"use client";

import React, { useCallback, useState } from "react";
import SearchBar from "~/components/ui/SearchBar/SearchBar";
import SortMethods from "~/components/ui/SortMethods/SortMethods";
import PlaylistItems from "~/features/voting/PlaylistItems/PlaylistItems";
import Pagination from "~/components/ui/Pagination/Pagination";
import SearchResults from "~/features/voting/PlaylistItems/SearchResults";
import { api } from "~/trpc/react";
import { useVoting } from "~/context/VotingContext";
import { useQueryParams } from "~/hooks/useQueryParams";
import NotLoggedIn from "~/features/voting/Popups/NotLoggedIn";

export default function VotingLayout() {
	const { votingId } = useVoting();
	const { currentPage, sortMethod, setPage, setSortMethod } = useQueryParams();

	const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
	const [searchString, setSearchString] = useState<string>("");
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	// Stabilize setPreviewUrl to prevent callback recreation
	const stableSetPreviewUrl = useCallback((url: string | null) => {
		setPreviewUrl(url);
	}, []);

	const itemsPerPage = 25;
	const offset = (currentPage - 1) * itemsPerPage;

	const {
		data: search_data,
		isLoading,
		error,
		refetch: refetchSearch,
	} = api.search.fullSearch.useQuery(
		{
			search_string: searchString,
			voting_id: votingId,
			limit: itemsPerPage,
			offset: (currentPage - 1) * itemsPerPage,
		},
		{ enabled: showSearchResults },
	);

	const handleSearchSubmit = useCallback(
		(value: string) => {
			setPage(1);
			setShowSearchResults(true);
			setSearchString(value);
		},
		[setPage, setShowSearchResults, setSearchString],
	);

	const { data: entriesTotal } = api.songs.entriesTotal.useQuery(
		{ voting_id: votingId },
		{ placeholderData: { count: 30 } },
	);

	return (
		<>
			<div className="flex flex-col items-center justify-center gap-2 pt-5">
				<SearchBar
					onSubmit={(value) => handleSearchSubmit(value)}
					lastSearch={searchString}
					onClose={() => {
						setShowSearchResults(false);
						setSearchString("");
					}}
					placeholder="Search by Song, Artist"
				/>
				<SortMethods
					className="w-[80vw] lg:w-[40rem]"
					currentSort={sortMethod}
					sortOptions={["A-Z", "Date Added", "Least Likes", "Likes", "Random"]}
					onChange={(method) => {
						setSortMethod(method);
					}}
				/>
			</div>
			{showSearchResults ? (
				<SearchResults
					search_data={search_data}
					isLoading={isLoading}
					error={error}
					activePreview={previewUrl}
					setPreviewUrl={stableSetPreviewUrl}
				/>
			) : (
				<PlaylistItems
					voting_id={votingId}
					activePreview={previewUrl}
					setPreviewUrl={stableSetPreviewUrl}
					offset={offset}
					limit={itemsPerPage}
				/>
			)}
			<div className="flex items-center justify-center p-10">
				{entriesTotal && entriesTotal?.count > 0 && (
					<>
						{showSearchResults && (
							<Pagination
								variant={"search_result"}
								totalPages={4}
								currentPage={currentPage}
								gotoPage={async (page) => {
									setPage(page);
									await refetchSearch();
								}}
							/>
						)}
					</>
				)}
			</div>
			<audio key={previewUrl} src={previewUrl ?? undefined} autoPlay hidden onEnded={() => stableSetPreviewUrl(null)} />
			<NotLoggedIn />
		</>
	);
}
