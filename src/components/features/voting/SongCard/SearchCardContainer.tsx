import React, { useState } from "react";
import SongCard from "./SongCard";
import type { TSongMetadata } from "~/types/songs";
import { nop } from "~/lib/utils";
import { api } from "~/trpc/react";

interface ISearchCardProps {
  metadata: TSongMetadata;
  addedSong: boolean;
  activePreview: string | null;
  setPreviewUrl: (url: string | null) => void;
}

export default function SearchCardContainer(props: ISearchCardProps) {
  const { metadata, addedSong, activePreview, setPreviewUrl } = props;

  const [added, setAdded] = useState<boolean>(addedSong);

  const addMutation = api.songs.addSongID.useMutation({
    onMutate: () => {
      setAdded(true);
    },
    onError: () => {
      //display error message
      setAdded(false);
    },
    onSuccess: () => {
      setAdded(true);
    },
  });

  interface IHandleAdd {
    song_id: number;
    voting_id: string;
  }

  function handleAdd({ song_id, voting_id }: IHandleAdd) {
    if (song_id === undefined || voting_id === undefined) return;
    if (!added) {
      addMutation.mutate({
        id: song_id,
        voting_id: voting_id,
      });
    } else {
      nop();
    }
  }

  function handlePlay() {
    if (activePreview === metadata.preview_url) {
      setPreviewUrl(null);
    } else {
      setPreviewUrl(metadata.preview_url!);
    }
  }

  return (
    <SongCard
      metadata={{ ...metadata }}
      onPlay={() => handlePlay()}
      added={false}
      addedSearchResult={added}
      onAdd={() =>
        handleAdd({
          song_id: metadata.deezer_id,
          voting_id: metadata.voting_id,
        })
      }
      isLoadingAdd={false}
      playState={activePreview === metadata.preview_url ? "pause" : "play"}
    />
  );
}
