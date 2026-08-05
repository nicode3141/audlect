"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const resumeVideo = async () => {
			if (document.visibilityState !== "visible") return;

			try {
				await video.play();
			} catch (error) {
				console.log("Video playback issue:", error);
			}
		};

		const handleVisibillity = () => {
			if (document.visibilityState === "visible") {
				void resumeVideo();
			}
		};

		const handlePageShow = () => {
			void resumeVideo();
		};

		document.addEventListener("visibilitychange", handleVisibillity);
		window.addEventListener("pageshow", handlePageShow);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibillity);
			window.removeEventListener("pageshow", handlePageShow);
		};
	}, []);

	return (
		<video
			ref={videoRef}
			autoPlay
			muted
			loop
			playsInline
			preload="metadata"
			className="object-cover w-full h-full bg-cover bg-center"
			style={{ backgroundImage: "url('/images/landing/hero-video-frame.webp')" }}
		>
			<source
				src="/videos/6602b47f0c264b8edbe569da_10swebmhd-transcode.webm"
				type='video/webm; codecs="vp9"'
				media="(max-width: 768px)"
			/>
			<source src="/videos/hero-video.webm" type='video/webm; codecs="vp9"' />
			<source src="/videos/hero-video.mp4" type="video/mp4" />
		</video>
	);
}
