import Image from "next/image";
import React from "react";

export default function ProductSection() {
	return (
		<section
			className="flex flex-col items-center gap-10 p-5 bg-[url('/images/backgrounds/mesh-background.avif')] bg-cover
				bg-center"
		>
			<div className="flex flex-col gap-1">
				<div className="font-inter font-bold text-black text-4xl">
					Discover Music <span className="text-company">anyone likes</span>
				</div>
				<p className="text-neutral-500 text-xl font-medium font-montserrat">
					Your guests can vote their own music they like!
				</p>
			</div>
			<Image
				src={"/images/landing/product-shot.avif"}
				alt={""}
				width={270}
				height={100}
				unoptimized
				className="rounded-xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] rotate-359"
			/>
		</section>
	);
}
