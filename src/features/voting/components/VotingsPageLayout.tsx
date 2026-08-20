"use client";

import React, { useCallback, useState } from "react";
import VotingItems from "~/features/votings/components/VotingItems";
import NewVotingButton from "~/features/votings/components/NewVotingButton";
import AudlectHeader from "~/shared/components/AudlectHeader";
import BrowseSearch from "./BrowseSearch";
import { api } from "~/trpc/react";

export default function VotingsPageLayout() {
	const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
	const [searchString, setSearchString] = useState<string>("");
	const [sort, setSort] = useState<"a-z" | "popularity" | "date">("popularity");

	const {} = api.search.searchPublicVotings.useQuery(
		{
			search_string: searchString,
			limit: 10,
		},
		{ enabled: showSearchResults },
	);

	const handleSearchSubmit = useCallback(
		(value: string) => {
			if (value === "") {
				setShowSearchResults(false);
			} else {
				setShowSearchResults(true);
			}
			setSearchString(value);
		},
		[setShowSearchResults, setSearchString],
	);

	return (
		<div>
			<div className={"VotingDetails font-inter pt-2"}>
				<AudlectHeader headerTitle={"Audlect"} />
				<div className="py-5">
					<div className={"heading1 font-montserrat text-center text-4xl font-bold text-company-second lg:text-6xl"}>
						Browse Votings
					</div>
					<div
						className={`heading2small font-inter text-center text-2xl font-normal text-neutral-400 text-shadow-2xs
							lg:text-3xl dark:text-gray-300`}
					>
						public votings on Audlect
					</div>
				</div>
			</div>
			<div className="w-full items-center flex flex-col">
				<BrowseSearch
					onSubmit={handleSearchSubmit}
					lastSearch={searchString}
					sort={sort}
					setSort={(method) => setSort(method)}
				/>
			</div>
			{showSearchResults ? <></> : <VotingItems sortMethod={sort} />}
			<div className="fixed right-0 bottom-0 z-10 flex items-center justify-center p-10">
				<NewVotingButton />
			</div>
		</div>
	);
}
