"use client";

import { useState } from "react";
import { api } from "~/trpc/react"; // adjust import path to your tRPC hook

export default function SearchBar() {
  const [query, setQuery] = useState("Imagine Dragons");
  const [searchString, setSearchString] = useState("");
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  const search = api.search.searchString.useQuery(
    { search_string: searchString, limit: 10, offset: 0 },
    { enabled: !!searchString } // prevents auto-run on mount
  );
  
  const postSong = api.songs.addSongID.useMutation({ onError(error){}});

  const handleSearch = () => {
    setSearchString(query);
  };

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
      {postSong.error && <p>Something went wrong! {postSong.error.message}</p>}

      {Array.isArray(search.data) &&
        search.data.map((track: any) => (
          <div
            key={track.id}
            className="flex items-center gap-4 border-b py-2"
          >
            {track.album?.cover && (
              <img
                src={track.album.cover}
                alt={track.album.title}
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
        src={playingUrl || undefined}
        autoPlay
        onEnded={() => setPlayingUrl(null)}
      /> 
    </div>
  );
}
