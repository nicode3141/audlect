"use client";

import { useState } from "react";
import { api } from "~/trpc/react"; // adjust import path to your tRPC hook

export default function SearchBar() {
  const [query, setQuery] = useState("Imagine Dragons");
  const [searchString, setSearchString] = useState("");

  const search = api.search.searchString.useQuery(
    { search_string: searchString },
    { enabled: !!searchString } // prevents auto-run on mount
  );

  const handleSearch = () => {
    setSearchString(query);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Deezer Search Test</h1>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a track..."
          className="border rounded px-2 py-1 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {search.isFetching && <p>Loading...</p>}
      {search.isError && <p className="text-red-500">Error: {search.error.message}</p>}

      {search.data ? (
        <ul className="space-y-2">
          {search.data.map((track: any) => (
            <li key={track.id} className="border-b pb-1">
              <p className="font-semibold">{track.title}</p>
              <p className="text-sm text-gray-600">
                {track.artist?.name} — {track.album?.title}
              </p>
            </li>
          ))}
        </ul>
      ): (<>No data</>)}
    </div>
  );
}
