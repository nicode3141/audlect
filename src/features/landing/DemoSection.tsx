import React from "react";
import DemoSongs from "./DemoSongs";
import { AudioProvider } from "~/features/voting/context/AudioContext";
import AudioProgressBar from "~/features/voting/components/AudioProgressBar";

export default function DemoSection() {
	return (
		<section
			className="demoSectionLanding flex flex-col items-center justify-center gap-10 p-5 py-15 w-full
				bg-[url('/images/backgrounds/mesh-background2.avif')] bg-cover bg-center md:flex-row md:gap-30 xl:max-w-[80vw]
				xl:rounded-2xl"
		>
			<div className="flex flex-col gap-5 items-center text-center max-w-80">
				<div className="font-inter font-bold text-black text-6xl">
					Now its <span className="text-[#415FFF]">your turn!</span>
				</div>
				<p className="text-neutral-700 text-2xl font-semibold font-montserrat">See how easy it is to vote...</p>
			</div>
			<AudioProvider>
				<DemoSongs />
				<AudioProgressBar />
			</AudioProvider>
		</section>
	);
}
