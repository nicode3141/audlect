"use client";

import React, { useEffect, useState } from "react";
import DemoSongCard from "./DemoSongCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const demoVotingID = "cea6a17e-fce5-4a8f-9a64-4fed40d9a1b9s";

const songs = [
	{
		song_id: "93817e81-f428-405a-8af9-8fec5f666ae7",
		deezer_id: 623698142,
		isrc: "USUM71607007",
		voting_id: demoVotingID,
		song_name: "Despacito",
		song_artists: "Luis Fonsi",
		cover_image: "https://cdn-images.dzcdn.net/images/cover/7985ef4ccd9e66af2fc3c18d629689aa/250x250-000000-80-0-0.jpg",
		preview_url: undefined,
		added_by: "cgyi0egyDxtYctog4sTOM2HDhaBnUapC",
		rank: "1",
		created_at: "2026-07-26T12:53:54.981948Z",
		initialLikes: 23,
	},
	{
		song_id: "fc95239b-dce1-4cbc-89cf-907c48025ef3",
		deezer_id: 1703487577,
		isrc: "USSM12200612",
		voting_id: demoVotingID,
		song_name: "As It Was",
		song_artists: "Harry Styles",
		cover_image: "https://cdn-images.dzcdn.net/images/cover/b0e936124f59e669ddba02ebe5893f95/250x250-000000-80-0-0.jpg",
		preview_url: undefined,
		added_by: "cgyi0egyDxtYctog4sTOM2HDhaBnUapC",
		rank: "2",
		created_at: "2026-07-26T12:55:11.245085Z",
		initialLikes: 47,
	},
	{
		song_id: "bb842708-17f2-404f-a7b6-5fb337236aff",
		deezer_id: 139470659,
		isrc: "GBAHS1600463",
		voting_id: demoVotingID,
		song_name: "Shape of You",
		song_artists: "Ed Sheeran",
		cover_image: "https://cdn-images.dzcdn.net/images/cover/107c2b43f10c249077c1f7618563bb63/250x250-000000-80-0-0.jpg",
		preview_url: undefined,
		added_by: "cgyi0egyDxtYctog4sTOM2HDhaBnUapC",
		rank: "3",
		created_at: "2026-07-26T12:55:19.120132Z",
		initialLikes: 31,
	},
];

export default function DemoSongs() {
	const [likedSong, setLikedSong] = useState<string | undefined>(undefined);
	const [likeCounts, setLikeCounts] = useState(() => songs.map((s) => s.initialLikes));

	useEffect(() => {
		function tick() {
			const idx = Math.floor(Math.random() * songs.length);
			setLikeCounts((prev) => {
				const next = [...prev];
				next[idx] = (next[idx] ?? 0) + 1;
				return next;
			});
		}

		const interval = setInterval(tick, 3000 + Math.random() * 5000);
		return () => clearInterval(interval);
	}, []);

	function likeSong(songId: string) {
		if (likedSong === songId) {
			setLikedSong(undefined);
		} else {
			setLikedSong(songId);
		}
		return undefined;
	}

	return (
		<div className="relative contents md:block">
			<div className="flex flex-col items-center justify-center gap-3.5 md:w-[40vw] xl:w-[25vw]">
				{songs.map((item, i) => (
					<DemoSongCard
						key={i}
						liked={likedSong === item.song_id}
						onLike={() => likeSong(item.song_id)}
						metadata={{
							song_id: item.song_id,
							deezer_id: item.deezer_id,
							isrc: undefined,
							voting_id: "",
							song_name: item.song_name,
							song_artists: item.song_artists,
							cover_image: item.cover_image,
							preview_url: item.preview_url,
							added_by: item.added_by,
							created_at: new Date(item.created_at),
							likes_total: (likeCounts[i] ?? 0) + (likedSong === item.song_id ? 1 : 0),
							liked: undefined,
						}}
					/>
				))}
			</div>
			{likedSong && (
				<Link
					className="flex md:hidden items-center text-white bg-company px-5 py-3 rounded-2xl text-lg sm:text-xl
						font-bold gap-1 shadow-xl shadow-company/10 text-center"
					href={"/voting/new"}
				>
					<>Now let your guests decide</>
					<ArrowRight className="text-white" strokeWidth={3} />
				</Link>
			)}
			{likedSong && (
				<div
					className="hidden md:flex absolute inset-0 z-20 items-center justify-center animate-in fade-in zoom-in-95
						duration-300 rounded-2xl"
				>
					<div className="bg-company rounded-3xl px-8 py-6 shadow-2xl shadow-company/30 flex items-center gap-2">
						<Link className="flex items-center text-white text-lg font-bold gap-1" href={"/voting/new"}>
							Now let your guests decide
							<ArrowRight className="text-white" strokeWidth={3} />
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
