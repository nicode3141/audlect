"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export interface AudioContent {
	songId: string;
	title: string;
	artists: string;
	cover?: string;
	previewUrl: string;
}

interface IAudioContext {
	currentSong: AudioContent | null;
	currentSongId: string | null;
	isPlaying: boolean;
	playSong: (song: AudioContent) => void;
	togglePlayback: () => void;
	pause: () => void;
	stop: () => void;
	seek: (time: number) => void;
	audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioContext = createContext<IAudioContext | undefined>(undefined);

interface IAudioProvider {
	children: React.ReactNode;
}

export const AudioProvider = (props: IAudioProvider) => {
	const { children } = props;

	const audioRef = useRef<HTMLAudioElement>(null);

	const [currentSong, setCurrentSong] = useState<AudioContent | null>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	const playSong = useCallback((song: AudioContent) => {
		setCurrentSong(song);
	}, []);

	const pause = useCallback(() => {
		audioRef.current?.pause();
	}, []);

	const stop = useCallback(() => {
		audioRef.current?.pause();

		if (audioRef.current) {
			audioRef.current.currentTime = 0;
		}

		setCurrentSong(null);
		setIsPlaying(false);
	}, []);

	const togglePlayback = useCallback(() => {
		const audio = audioRef.current;

		if (!audio) return;

		if (audio.paused) {
			void audio.play();
		} else {
			audio.pause();
		}
	}, []);

	const seek = useCallback((time: number) => {
		if (!audioRef.current) return;

		audioRef.current.currentTime = time;
	}, []);

	useEffect(() => {
		const audio = audioRef.current;

		if (!audio || !currentSong) return;

		audio.src = currentSong.previewUrl;

		void audio.play();
	}, [currentSong]);

	const value = useMemo<IAudioContext>(
		() => ({
			currentSong,
			currentSongId: currentSong?.songId ?? null,
			isPlaying,
			playSong,
			togglePlayback,
			pause,
			stop,
			seek,
			audioRef,
		}),
		[currentSong, isPlaying, playSong, togglePlayback, pause, stop, seek],
	);

	return (
		<AudioContext.Provider value={value}>
			{children}
			<audio
				ref={audioRef}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				onEnded={stop}
				hidden
			/>
		</AudioContext.Provider>
	);
};

export const useAudio = () => {
	const ctx = useContext(AudioContext);
	if (!ctx) throw new Error("useAudio must be used within a AudioProvider");

	return ctx;
};
