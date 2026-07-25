import Image from "next/image";
import React from "react";

export default function DeadlineFeature() {
	return (
		<section
			className="flex flex-col items-center gap-10 p-5 bg-[url('/images/backgrounds/mesh-background-3.avif')] bg-cover
				bg-center py-10 w-full pb-20"
		>
			<div className="flex flex-col gap-1">
				<div className="font-inter font-bold text-black text-4xl">Set Deadlines for Votings </div>
				<p className="text-neutral-500 text-xl font-medium font-montserrat">
					Control when your voting starts and ends{" "}
				</p>
			</div>
			<div className="relative h-90 w-full flex items-center justify-center perspective-[1000px]">
				<Image
					src={"/images/landing/mockup-deadline-dark.avif"}
					alt={""}
					width={245}
					height={100}
					unoptimized
					className="absolute rounded-2xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] rotate-8 z-1 right-2
						hover:-translate-x-16 hover:-rotate transition-all duration-300 ease-out"
				/>
				<Image
					src={"/images/landing/mockup-deadline-light.avif"}
					alt={""}
					width={230}
					height={100}
					unoptimized
					className="absolute rounded-2xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] rotate-355 left-2"
				/>
			</div>
		</section>
	);
}
