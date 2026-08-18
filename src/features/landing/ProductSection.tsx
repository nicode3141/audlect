import Image from "next/image";
import React from "react";
import { TextFade } from "~/shared/animations/TextFade";
import OptimizedImage from "~/shared/components/OptimizedImage";

export default function ProductSection() {
	return (
		<section
			className="flex flex-col items-center gap-10 p-5 bg-[url('/images/backgrounds/mesh-background.avif')] bg-cover
				bg-center md:bg-none md:flex-row md:gap-50 md:py-30"
		>
			<div className="flex flex-col gap-1 md:hidden">
				<div className="font-inter font-bold text-black text-4xl">
					Discover Music <span className="text-company">anyone likes</span>
				</div>
				<p className="text-neutral-500 text-xl font-medium font-montserrat">
					Your guests can vote their own music they like!
				</p>
			</div>

			<TextFade className="hidden flex-col gap-1 md:flex max-w-[50vw]" direction="up">
				<div className="font-inter font-bold text-black text-5xl">
					Find out what <br></br>your crowd likes
				</div>
				<p className="text-neutral-500 text-2xl font-medium font-montserrat max-w-[30vw]">
					Your guests can vote their own music they like!
				</p>
				<p className="text-neutral-400 text-xl font-medium font-montserrat max-w-[30vw] pt-10">
					secure votings in seconds.{" "}
				</p>
			</TextFade>
			<OptimizedImage
				src={"/images/landing/product-shot"}
				alt={"Audlect music voting interface showing guest song voting"}
				width={270}
				height={100}
				className="rounded-xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] rotate-359 bg-gray-700 h-115 w-67.5"
			/>
		</section>
	);
}
