"use client";

import React from "react";
import SkeletonSongCard from "../SongCard/SkeletonSongCard";
import SongCardContainer from "../SongCard/SongCardContainer";
import type { RouterOutputs } from "~/trpc/react";
import type { TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "~/server/api/root";
import SearchCardContainer from "../SongCard/SearchCardContainer";
import { useVoting } from "~/context/VotingContext";

interface IPlaylistItemProps {
	search_data?: RouterOutputs["search"]["fullSearch"];
	isLoading: boolean;
	error?: TRPCClientErrorLike<AppRouter> | null;
	setPreviewUrl: (url: string | null) => void;
	playingSongId?: string | null;
	setPlayingSongId?: (id: string | null) => void;
}

export default function SearchResults(props: IPlaylistItemProps) {
	const { votingId } = useVoting();
	const { search_data, isLoading, error, setPreviewUrl, playingSongId, setPlayingSongId } = props;

	return (
		<div className="flex flex-col items-center justify-center">
			{isLoading && (
				<div className="flex flex-col gap-3.5 pt-5">
					{Array.from({ length: 10 }).map((_, i) => (
						<SkeletonSongCard key={i} />
					))}
				</div>
			)}

			{error && (
				<div className="font-inter flex flex-col items-center justify-center text-center font-semibold text-balance">
					<span className="text-xl text-[#C04848]">Something went wrong, try reloading your page...</span>
					<span className="max-w-[80vw] text-sm text-gray-700 dark:text-gray-100">
						If this error persists, contact info@nicodenetworks.com
					</span>
				</div>
			)}

			{!isLoading &&
				!error &&
				search_data?.added_items.map((items) => (
					<div className="flex flex-col gap-3.5 pb-5" key={items.isrc}>
						<SongCardContainer
							metadata={{
								song_id: items.song_id,
								deezer_id: items.deezer_id,
								isrc: items.isrc ?? undefined,
								voting_id: votingId,
								song_name: items.song_name ?? "Loading",
								song_artists: items.song_artists ?? "Loading",
								cover_image: items.cover_image ?? undefined,
								added_by: items.added_by,
								likes_total: items.likes_total,
								liked: items.liked,
							}}
							variant="playlist"
							setPreviewUrl={setPreviewUrl}
							playingSongId={playingSongId}
							setPlayingSongId={setPlayingSongId}
						/>
					</div>
				))}

			{!isLoading && search_data?.deezer_items && !error && (
				<div className="flex flex-col gap-3.5">
					<div className="font-montserrat pt-[-2] text-center text-[-2rem] font-bold dark:text-white">Add Songs</div>
					{search_data?.deezer_items?.map((items) => (
						<SearchCardContainer
							key={items.deezer_id}
							metadata={{
								deezer_id: items.deezer_id,
								voting_id: votingId,
								song_name: items.song_name,
								song_artists: items.song_artists,
								cover_image: items.cover_image,
								preview_url: items.preview_url,
							}}
							addedSong={false}
							setPreviewUrl={setPreviewUrl}
							playingSongId={playingSongId}
							setPlayingSongId={setPlayingSongId}
						/>
					))}
				</div>
			)}
		</div>
	);
}
