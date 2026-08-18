import Image from "next/image";
import React from "react";
import OptimizedImage from "~/shared/components/OptimizedImage";

export default function DeadlineFeature() {
	return (
		<section
			className="flex flex-col items-center gap-10 p-5 bg-[url('/images/backgrounds/mesh-background-3.avif')] bg-cover
				bg-center py-10 w-full pb-20 md:bg-none md:gap-2 md:pb-3"
		>
			<div className="flex flex-col gap-1 md:order-2 md:gap-2 md:w-full">
				<div className="font-inter font-bold text-black text-4xl md:text-3xl xl:text-4xl">
					Set Deadlines for Votings{" "}
				</div>
				<p className="text-neutral-500 text-xl font-medium font-montserrat md:text-2xl md:max-w-90">
					Control when your voting starts and ends{" "}
				</p>
			</div>
			<div
				className="md:order-1 md:bg-[url('/images/backgrounds/mesh-background-3.avif')] bg-cover bg-center md:rounded-lg
					h-90 w-full flex items-center justify-center md:p-20"
			>
				<div className="relative h-90 w-full flex items-center justify-center perspective-[1000px]">
					<OptimizedImage
						src={"/images/landing/mockup-deadline-dark"}
						alt={"Audlect voting deadline settings in dark mode"}
						width={245}
						height={100}
						classNameParent="absolute rounded-2xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] rotate-8 z-1 right-2 md:w-45"
						className="rounded-2xl select-none"
					/>
					<OptimizedImage
						src={"/images/landing/mockup-deadline-light"}
						alt={"Audlect voting deadline settings in light mode"}
						width={230}
						height={100}
						classNameParent="absolute rounded-2xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] rotate-355 left-2 md:w-45"
						className="rounded-2xl select-none"
					/>
				</div>
			</div>
		</section>
	);
}
