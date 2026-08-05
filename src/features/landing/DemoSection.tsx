import React from "react";
import DemoSongs from "./DemoSongs";
import { AudioProvider } from "~/features/voting/context/AudioContext";
import AudioProgressBar from "~/features/voting/components/AudioProgressBar";

export default function DemoSection() {
	return (
		<section
			className="demoSectionLanding flex flex-col items-center gap-10 p-5 py-15 w-full
				bg-[url('/images/backgrounds/mesh-background2.avif')] bg-cover bg-center"
		>
			<div className="flex flex-col gap-1 items-center text-center">
				<div className="font-inter font-bold text-black text-4xl">Your turn!</div>
				<p className="text-neutral-500 text-2xl font-medium font-montserrat">Which song is best?</p>
			</div>
			<AudioProvider>
				<DemoSongs />
				<AudioProgressBar />
			</AudioProvider>
		</section>
	);
}
