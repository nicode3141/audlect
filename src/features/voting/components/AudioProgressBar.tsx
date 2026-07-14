"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAudio } from "../context/AudioContext";
import PlayIcon from "~/shared/icons/PlayIcon";

function formatTime(seconds: number): string {
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60);
	return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioProgressBar() {
	const { currentSong, isPlaying, togglePlayback, stop, seek, audioRef } = useAudio();

	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const progressRef = useRef<HTMLDivElement>(null);
	const isSeeking = useRef(false);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const onTimeUpdate = () => {
			if (!isSeeking.current) {
				setCurrentTime(audio.currentTime);
			}
		};

		const onLoadedMetadata = () => {
			setDuration(audio.duration);
			setCurrentTime(0);
		};

		const onEnded = () => {
			setCurrentTime(0);
			setDuration(0);
		};

		audio.addEventListener("timeupdate", onTimeUpdate);
		audio.addEventListener("loadedmetadata", onLoadedMetadata);
		audio.addEventListener("ended", onEnded);

		if (audio.readyState >= 1) {
			setDuration(audio.duration);
		}

		return () => {
			audio.removeEventListener("timeupdate", onTimeUpdate);
			audio.removeEventListener("loadedmetadata", onLoadedMetadata);
			audio.removeEventListener("ended", onEnded);
		};
	}, [audioRef, currentSong]);

	const handleSeek = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const bar = progressRef.current;
			if (!bar || !duration) return;

			const rect = bar.getBoundingClientRect();
			const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
			const newTime = ratio * duration;
			seek(newTime);
			setCurrentTime(newTime);
		},
		[duration, seek],
	);

	const handlePointerDown = useCallback(
		(e: React.PointerEvent<HTMLDivElement>) => {
			isSeeking.current = true;
			handleSeek(e);

			const onPointerMove = (ev: PointerEvent) => {
				const bar = progressRef.current;
				if (!bar || !duration) return;
				const rect = bar.getBoundingClientRect();
				const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
				setCurrentTime(ratio * duration);
			};

			const onPointerUp = (ev: PointerEvent) => {
				isSeeking.current = false;
				const bar = progressRef.current;
				if (bar && duration) {
					const rect = bar.getBoundingClientRect();
					const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
					seek(ratio * duration);
				}
				window.removeEventListener("pointermove", onPointerMove);
				window.removeEventListener("pointerup", onPointerUp);
			};

			window.addEventListener("pointermove", onPointerMove);
			window.addEventListener("pointerup", onPointerUp);
		},
		[duration, handleSeek, seek],
	);

	if (!currentSong) return null;

	const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

	return (
		<div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center md:bottom-5">
			<div
				className="w-screen border-t border-neutral-200 bg-white/70 p-2 backdrop-blur dark:border-neutral-700/10
					dark:bg-[#1a1a1a]/60 pb-3 px-2 md:w-180 md:rounded-3xl md:shadow md:border-0 md:p-3 md:pb-0"
			>
				<div className="mx-auto flex max-w-3xl items-center gap-3">
					<div className="flex shrink-0 items-center justify-center">
						<button
							className="absolute z-10 flex cursor-pointer items-center justify-center"
							onClick={togglePlayback}
							aria-label="play-button"
						>
							<PlayIcon type={isPlaying ? "pause" : "play"} className="h-10 w-10 opacity-70" />
						</button>
						<Image
							src={currentSong.cover ?? "/ImagePlaceholder.png"}
							alt={currentSong.title}
							width={48}
							height={48}
							className="h-14 w-14 rounded-lg"
							onError={(e) => (e.currentTarget.src = "/ImagePlaceholder.png")}
							unoptimized
						/>
					</div>

					<div className="flex min-w-0 flex-1 flex-col gap-1">
						<div className="flex min-w-0 items-center gap-2">
							<div className="min-w-0 flex-1">
								<div className="font-montserrat truncate text-md font-semibold dark:text-white">
									{currentSong.title}
								</div>
								<div className="font-montserrat truncate text-xs text-gray-500 dark:text-gray-400">
									{currentSong.artists}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2 p-2">
					<span className="w-8 text-right text-[10px] tabular-nums text-gray-500 dark:text-gray-400">
						{formatTime(currentTime)}
					</span>

					<div
						ref={progressRef}
						className="group relative h-1.5 flex-1 cursor-pointer rounded-full bg-gray-200 dark:bg-neutral-700"
						onPointerDown={handlePointerDown}
					>
						<div
							className="absolute top-0 left-0 h-full rounded-full bg-[#758BFD] transition-[width] duration-75"
							style={{ width: `${progress}%` }}
						/>
						<div
							className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#758BFD] opacity-0
								transition-opacity group-hover:opacity-100"
							style={{ left: `${progress}%` }}
						/>
					</div>

					<span className="w-8 text-[10px] tabular-nums text-gray-500 dark:text-gray-400">{formatTime(duration)}</span>
				</div>
			</div>
		</div>
	);
}
