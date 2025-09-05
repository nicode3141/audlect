"use client";

import React, { useState } from "react";
import { VotingDetails } from "../VotingDetails/VotingDetails";
import SearchBar from "~/components/ui/SearchBar/SearchBar";
import { nop } from "~/lib/utils";
import SortMethods from "~/components/ui/SortMethods/SortMethods";
import type { SortMethodsType } from "~/types/global";
import PlaylistItems from "~/components/features/voting/PlaylistItems/PlaylistItems";
import Pagination from "~/components/ui/Pagination/Pagination";
import SearchResults from "~/components/features/voting/PlaylistItems/SearchResults";
import { api } from "~/trpc/react";
import { set } from "zod";

export default function VotingLayout() {
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    data: search_data,
    isLoading,
    error,
  } = api.search.fullSearch.useQuery(
    {
      search_string: searchString,
      voting_id: "5b0c7148-90cc-4b8f-83a1-dea74841939d",
      limit: 10,
      offset: 0,
    },
    { enabled: showSearchResults },
  );

  return (
    <>
      <VotingDetails />
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
          voting_id="5b0c7148-90cc-4b8f-83a1-dea74841939d"
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
        />
      )}
      <div className="flex items-center justify-center p-10">
        <Pagination
          variant={"default"}
          totalPages={10}
          currentPage={1}
          gotoPage={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <audio
        key={previewUrl}
        src={previewUrl ?? undefined}
        autoPlay
        hidden
        onEnded={() => setPreviewUrl(null)}
      />
    </>
  );
}
