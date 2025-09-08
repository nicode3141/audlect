"use client";

import React, { useState } from "react";
import { VotingDetails } from "../VotingDetails/VotingDetails";
import SearchBar from "~/components/ui/SearchBar/SearchBar";
import SortMethods from "~/components/ui/SortMethods/SortMethods";
import PlaylistItems from "~/components/features/voting/PlaylistItems/PlaylistItems";
import Pagination from "~/components/ui/Pagination/Pagination";
import SearchResults from "~/components/features/voting/PlaylistItems/SearchResults";
import { api } from "~/trpc/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useVoting } from "~/context/VotingContext";

export default function VotingLayout() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { votingId } = useVoting();

	const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
	const [searchString, setSearchString] = useState<string>("");
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const currentPage = parseInt(searchParams.get("page") ?? "1");
	const itemsPerPage = 10;
	const offset = (currentPage - 1) * itemsPerPage;

	const {
		data: search_data,
		isLoading,
		error,
	} = api.search.fullSearch.useQuery(
		{
			search_string: searchString,
			voting_id: votingId,
			limit: 10,
			offset: 0,
		},
		{ enabled: showSearchResults },
	);

	const { data: entriesTotal, isLoading: entriesLoading } = api.songs.entriesTotal.useQuery(
		{ voting_id: votingId },
		{ placeholderData: { count: 30 } },
	);

	async function handlePageChange(page: number) {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set("page", page.toString());
		router.push(`?${newSearchParams.toString()}`);
	}

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
					currentSort={"Likes"}
					sortOptions={["A-Z", "Date Added"]}
					onChange={function (): void {
						throw new Error("Function not implemented.");
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
					voting_id="5b0c7148-90cc-4b8f-83a1-dea74841939d"
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
					gotoPage={(page) => handlePageChange(page)}
				/>
			</div>
			<audio key={previewUrl} src={previewUrl ?? undefined} autoPlay hidden onEnded={() => setPreviewUrl(null)} />
		</>
	);
}
