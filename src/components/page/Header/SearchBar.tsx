"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { DeezerTrack } from "~/types/deezer";
import { api } from "~/trpc/react";


export default function SearchBar() {
  const [query, setQuery] = useState("Imagine Dragons");
  const debouncedQuery = useDebounce(query, 100);
  const [searchString, setSearchString] = useState("");
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  const search = api.search.searchString.useQuery(
    { search_string: debouncedQuery, limit: 10, offset: 0 },
    { enabled: !!debouncedQuery } // prevents auto-run on mount
  );
  
  const postSong = api.songs.addSongID.useMutation({});

  const handleSearch = () => {
    setSearchString(query);
  };

  function useDebounce<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
  }

  const addSong = (id:number) => {
    postSong.mutate({ voting_id: "5b0c7148-90cc-4b8f-83a1-dea74841939d", id: id })

    if(postSong.error){
      console.log("error!");
    }
  }

  const handlePlay = (url: string) => {
    if (playingUrl === url) {
      // stop playback
      setPlayingUrl(null);
    } else {
      setPlayingUrl(url);
    }
  };


  return (
    <div className="flex items-center justify-center my-10">
    <div className="p-4 space-y-4 w-1/2">
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
          aria-label='search'
        >
          Search
        </button>
      </div>

      {search.isFetching && <p>Loading...</p>}
      {search.isError && <p className="text-red-500">Error: {search.error.message}</p>}
      {postSong.error && <p>Something went wrong! {postSong.error.message}</p>}

      {Array.isArray(search.data?.data) &&
        search.data.data.map((track: DeezerTrack) => (
          <div
            key={track.id}
            className="flex items-center gap-4 border-b py-2"
          >
            {track.album?.cover && (
              <Image
                src={track.album.cover}
                alt={track.album.title}
                width={12}
                height={12}
                className="w-12 h-12 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <p className="font-semibold">{track.title}</p>
              <p className="text-sm text-gray-600">{track.artist?.name}</p>
            </div>
            {track.preview && (
              <button
                onClick={() => handlePlay(track.preview)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                {playingUrl === track.preview ? "Pause" : "Play"}
              </button>
            )}
            <button
                onClick={() => addSong(track.id)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                Add
              </button>
          </div>
        ))}

      {/* Audio element */}
      <audio
        key={playingUrl} // re-mount when URL changes
        src={playingUrl ?? undefined}
        autoPlay
        onEnded={() => setPlayingUrl(null)}
      /> 
    </div>
    </div>
  );
}
