import Image from "next/image";
import React from "react";
import {
  AddSongButton,
  LikeButton,
} from "~/components/ui/SongButtons/SongButtons";
import MoreIcon from "~/components/icons/MoreIcon";
import { nop } from "~/lib/utils";
import type { TSongMetadata } from "~/types/songs";
import PlayIcon from "~/components/icons/PlayIcon";

interface SongCardProps {
  metadata: TSongMetadata;
  added: boolean;
  addedSearchResult?: boolean;
  liked?: boolean;
  onLike?: () => void;
  onMore?: () => void;
  onAdd?: () => void;
  onPlay?: () => void;
  playState?: "play" | "pause" | "loading";
  isLoadingLike?: boolean;
  isLoadingAdd?: boolean;
}

export default function SongCard({
  metadata,
  added,
  addedSearchResult,
  liked,
  onLike,
  onMore,
  onAdd,
  onPlay,
  playState,
  isLoadingLike,
  isLoadingAdd,
}: SongCardProps) {
  return (
    <div className="flex w-[90vw] items-center justify-between gap-5 rounded-3xl bg-[#F0F0F0] p-2.5 md:w-2xl">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="flex shrink-0 items-center justify-center">
          <button
            className="absolute z-10 flex cursor-pointer items-center justify-center"
            onClick={onPlay ?? nop}
            aria-label="play-button"
          >
            <PlayIcon type={playState} className="h-10 w-10" />
          </button>
          <Image
            src={metadata.cover_image ?? ""}
            alt={metadata.song_name}
            width={90}
            height={90}
            className="h-16 w-16 rounded-xl"
          />
        </div>
        <div className="flex min-w-0 flex-col leading-tight">
          <div className="font-montserrat truncate text-[1.15rem] font-semibold">
            {metadata.song_name}
          </div>
          <div className="font-montserrat truncate text-sm text-gray-600">
            {metadata.song_artists}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 p-2">
        {added ? (
          <>
            <div className="flex flex-col gap-1">
              <LikeButton
                liked={liked ?? false}
                isLoadingLike={isLoadingLike ?? false}
                handleLike={onLike ?? nop}
              ></LikeButton>
              <div className="text-center text-sm text-gray-700 select-none">
                {metadata.likes_total}
              </div>
            </div>
            <button
              className="cursor-pointer"
              aria-label="more-info"
              onClick={onMore ?? nop}
            >
              <MoreIcon />
            </button>
          </>
        ) : (
          <AddSongButton
            added={addedSearchResult ?? false}
            isLoadingAdd={isLoadingAdd ?? false}
            handleAdd={onAdd ?? nop}
          ></AddSongButton>
        )}
      </div>
    </div>
  );
}
