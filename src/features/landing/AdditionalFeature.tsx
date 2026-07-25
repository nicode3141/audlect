import Image from "next/image";
import React from "react";

export default function AdditionalFeature() {
	return (
		<div
			className="flex flex-col items-center gap-10 p-5 bg-[url('/images/backgrounds/mesh-background-4.avif')] bg-cover
				bg-center py-10 w-full"
		>
			<section className="flex flex-col items-center text-center">
				<div className="flex flex-col gap-1">
					<div className="font-inter font-bold text-black text-4xl">Set limits.</div>
					<p className="text-neutral-500 text-xl font-medium font-montserrat">
						Only let your guest vote their best music
					</p>
				</div>
				<div className="relative h-90 w-full flex items-center justify-center perspective-[1000px]">
					<Image
						src={"/images/landing/mockup-limits-light.avif"}
						alt={""}
						width={245}
						height={100}
						unoptimized
						className="absolute rounded-2xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] rotate-8 z-1 right-2"
					/>
					<Image
						src={"/images/landing/mockup-limits-dark.avif"}
						alt={""}
						width={230}
						height={100}
						unoptimized
						className="absolute rounded-2xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] rotate-355 left-2"
					/>
				</div>
			</section>
			<section className="flex flex-col items-center text-center">
				<div className="flex flex-col gap-1 text-shadow-2xs">
					<div className="font-inter font-bold text-black text-4xl">Listen to music</div>
					<p className="text-neutral-500 text-xl font-medium font-montserrat">Listen to song previews for free </p>
				</div>
				<div className="relative h-90 w-full flex items-center justify-center perspective-[1000px]">
					<Image
						src={"/images/landing/mockup-preview-dark.avif"}
						alt={""}
						width={245}
						height={100}
						unoptimized
						className="absolute rounded-2xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] z-1 right-2 -translate-y-5"
					/>
					<Image
						src={"/images/landing/mockup-preview-light.avif"}
						alt={""}
						width={230}
						height={100}
						unoptimized
						className="absolute rounded-2xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] left-2 translate-y-1"
					/>
				</div>
			</section>
		</div>
	);
}
