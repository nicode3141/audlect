"use client";

import React, { useState } from "react";
import SearchBar from "~/components/ui/SearchBar/SearchBar";
import SortMethods from "~/components/ui/SortMethods/SortMethods";
import PlaylistItems from "~/features/voting/PlaylistItems/PlaylistItems";
import Pagination from "~/components/ui/Pagination/Pagination";
import SearchResults from "~/features/voting/PlaylistItems/SearchResults";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useVoting } from "~/context/VotingContext";
import { useQueryParams } from "~/hooks/useQueryParams";
import { set } from "zod";
import { scrollSmoothToTop } from "~/lib/utils";

export default function VotingLayout() {
	const router = useRouter();
	const { votingId } = useVoting();
	const { currentPage, sortMethod, setPage, setSortMethod } = useQueryParams();

	const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
	const [searchString, setSearchString] = useState<string>("");
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const itemsPerPage = 30;
	const offset = (currentPage - 1) * itemsPerPage;

	const {
		data: search_data,
		isLoading,
		error,
	} = api.search.fullSearch.useQuery(
		{
			search_string: searchString,
			voting_id: votingId,
			limit: 30,
			offset: 0,
		},
		{ enabled: showSearchResults },
	);

	const { data: entriesTotal, isLoading: entriesLoading } = api.songs.entriesTotal.useQuery(
		{ voting_id: votingId },
		{ placeholderData: { count: 30 } },
	);

	return (
		<>
			<div className="flex flex-col items-center justify-center gap-2 pt-5">
				<SearchBar
					onSubmit={(value) => {
						setShowSearchResults(true);
						setSearchString(value);
					}}
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
						scrollSmoothToTop(0);
					}}
				/>
			</div>
			{showSearchResults ? (
				<SearchResults
					search_data={search_data}
					isLoading={isLoading}
					error={error}
					activePreview={previewUrl}
					setPreviewUrl={setPreviewUrl}
				/>
			) : (
				<PlaylistItems
					voting_id={votingId}
					activePreview={previewUrl}
					setPreviewUrl={setPreviewUrl}
					offset={offset}
					limit={itemsPerPage}
				/>
			)}
			<div className="flex items-center justify-center p-10">
				<Pagination
					variant={"default"}
					totalPages={Math.ceil((entriesTotal?.count ?? 30) / itemsPerPage)}
					currentPage={currentPage}
					gotoPage={(page) => {
						setPage(page);
						scrollSmoothToTop(0);
					}}
				/>
			</div>
			<audio key={previewUrl} src={previewUrl ?? undefined} autoPlay hidden onEnded={() => setPreviewUrl(null)} />
		</>
	);
}
