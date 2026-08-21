"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function HeroVideo() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isDesktop, setIsDesktop] = useState(false);

	const { scrollY } = useScroll();

	const crop = useTransform(scrollY, [0, 600], [0, isDesktop ? 8 : 3]);
	const clipPath = useTransform(crop, (value) => (isDesktop ? `inset(0 ${value}% 0 ${value}%)` : "inset(0 0 0 0)"));

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

	useEffect(() => {
		const media = window.matchMedia("(min-width: 1280px)");

		const update = () => setIsDesktop(media.matches);

		update();
		media.addEventListener("change", update);

		return () => media.removeEventListener("change", update);
	}, []);

	return (
		<motion.div
			className="relative h-[65vh] md:h-screen w-full overflow-hidden bg-white"
			style={{
				clipPath,
			}}
		>
			<video
				ref={videoRef}
				autoPlay
				muted
				loop
				playsInline
				preload="metadata"
				className="object-cover w-full h-full bg-cover bg-center select-none bg-blue-950"
				style={{ backgroundImage: "url('/images/landing/hero-video-frame.webp')" }}
			>
				<source src="/videos/hero-video-mobile.webm" type='video/webm; codecs="vp9"' media="(max-width: 768px)" />
				<source src="/videos/hero-video.webm" type='video/webm; codecs="vp9"' />
				<source src="/videos/hero-video.mp4" type="video/mp4" />
			</video>
		</motion.div>
	);
}
