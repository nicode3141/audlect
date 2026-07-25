import Image from "next/image";
import React from "react";

export default function ReferencesSection() {
	return (
		<section className="flex flex-col items-center gap-10 p-5 pt-20 pb-20">
			<div className="flex flex-col gap-1">
				<div className="font-inter font-bold text-black text-4xl">References</div>
				<p className="text-neutral-500 text-2xl font-bold font-inter">
					Already used by <b className="text-black">200+ guests</b> at live events
				</p>
			</div>
			<Image
				src={"/images/landing/social-proof-1.avif"}
				alt={""}
				width={500}
				height={100}
				unoptimized
				className="rounded-md shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)]"
			/>
			<div className="text-neutral-700 font-semibold text-md">
				Built from a real problem:<br></br>
				<span className="text-base">
					Choosing music the <span className="text-company">whole event enjoys.</span>
				</span>
			</div>
		</section>
	);
}
