import Image from "next/image";
import React from "react";

export default function AdditionalFeature() {
	return (
		<div
			className="flex flex-col items-center gap-10 p-5 bg-[url('/images/backgrounds/mesh-background-4.avif')] bg-cover
				bg-center py-10 w-full md:flex-row md:bg-none md:gap-0 md:items-start md:justify-around md:p-0"
		>
			<section className="flex flex-col items-center text-center md:gap-2 md:p-5">
				<div className="flex flex-col gap-1 md:order-2 md:w-full">
					<div className="font-inter font-bold text-black text-4xl md:text-left md:text-3xl xl:text-4xl">
						Set limits.
					</div>
					<p className="text-neutral-500 text-xl font-medium font-montserrat md:text-2xl md:max-w-90 md:text-left">
						Only let your guest vote their best music
					</p>
				</div>
				<div
					className="h-90 w-full md:w-105 flex items-center justify-center md:order-1 md:bg-neutral-100 md:rounded-lg
						md:p-10"
				>
					<div className="relative h-90 w-full flex items-center justify-center perspective-[1000px]">
						<Image
							src={"/images/landing/mockup-limits-light.avif"}
							alt={""}
							width={245}
							height={100}
							unoptimized
							className="absolute rounded-2xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] rotate-8 z-1 right-2 md:w-50"
						/>
						<Image
							src={"/images/landing/mockup-limits-dark.avif"}
							alt={""}
							width={230}
							height={100}
							unoptimized
							className="absolute rounded-2xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] rotate-355 left-2 md:w-50"
						/>
					</div>
				</div>
			</section>
			<section className="flex flex-col items-center text-center md:p-5">
				<div className="flex flex-col gap-1 text-shadow-2xs md:order-2 md:text-shadow-none md:text-left md:w-full">
					<div className="font-inter font-bold text-black text-4xl md:text-3xl xl:text-4xl">Listen to music</div>
					<p className="text-neutral-500 text-xl font-medium font-montserrat">Listen to song previews for free </p>
				</div>
				<div
					className="h-90 w-full md:w-105 flex items-center justify-center md:order-1 md:bg-neutral-100 md:rounded-lg
						md:p-10"
				>
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
				</div>
			</section>
		</div>
	);
}
