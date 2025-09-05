"use client";

import React from "react";
import { useSongs } from "~/hooks/useSongs";
import SongCard from "../SongCard/SongCard";
import SkeletonSongCard from "../SongCard/SkeletonSongCard";
import SongCardContainer from "../SongCard/SongCardContainer";
import { nop } from "~/lib/utils";

interface IPlaylistItemProps {
  voting_id: string;
  activePreview: string | null;
  setPreviewUrl: (url: string | null) => void;
}

export default function PlaylistItems(props: IPlaylistItemProps) {
  const { voting_id, activePreview, setPreviewUrl } = props;
  const {
    data: songs,
    isLoading,
    error,
  } = useSongs({
    limit: 10,
    offset: 0,
    sort_method: "Likes",
    voting_id: "5b0c7148-90cc-4b8f-83a1-dea74841939d",
  });

  return (
    <div className="flex flex-col items-center justify-center gap-3.5">
      {isLoading &&
        Array.from({ length: 10 }).map((_, i) => <SkeletonSongCard key={i} />)}

      {error && (
        <div className="font-inter flex flex-col items-center justify-center text-center font-semibold text-balance">
          <span className="text-xl text-[#C04848]">
            Something went wrong, try reloading your page...
          </span>
          <span className="max-w-[80vw] text-sm text-gray-700">
            If this error persists, contact info@nicodenetworks.com
          </span>
        </div>
      )}

      {!isLoading &&
        !error &&
        songs?.map((items) => (
          <SongCardContainer
            key={items.isrc}
            metadata={{
              song_id: items.song_id,
              deezer_id: items.deezer_id,
              isrc: items.isrc ?? undefined,
              voting_id: voting_id,
              song_name: items.song_name ?? "Loading",
              song_artists: items.song_artists ?? "Loading",
              cover_image: items.cover_image ?? undefined,
              added_by: items.added_by,
              likes_total: items.likes_total,
              liked: items.liked,
            }}
            variant="playlist"
            activePreview={activePreview}
            setPreviewUrl={setPreviewUrl}
          />
        ))}
    </div>
  );
}
