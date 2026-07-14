"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export interface AudioContent {
	songId: string;
	title: string;
	artists: string;
	cover?: string;
	previewUrl: string;
}

interface IAudioContext {
	currentSong: AudioContent | null;
	isPlaying: boolean;
	currentTime: number;
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
	const [currentTime, setCurrentTime] = useState<number>(0);

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
		setCurrentTime(0);
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
		setCurrentTime(time);
	}, []);

	useEffect(() => {
		const audio = audioRef.current;

		if (!audio || !currentSong) return;

		audio.src = currentSong.previewUrl;

		void audio.play();
	}, [currentSong]);

	return (
		<AudioContext.Provider
			value={{
				currentSong,
				isPlaying,
				currentTime,
				playSong,
				togglePlayback,
				pause,
				stop,
				seek,
				audioRef,
			}}
		>
			{children}
			<audio
				ref={audioRef}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				onEnded={stop}
				onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
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
