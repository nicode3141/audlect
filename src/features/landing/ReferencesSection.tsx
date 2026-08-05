import Image from "next/image";
import React from "react";
import OptimizedImage from "~/shared/components/OptimizedImage";

export default function ReferencesSection() {
	return (
		<section className="flex flex-col items-center gap-10 p-5 pt-20 pb-20 md:py-30">
			<div className="flex flex-col gap-1 md:w-[40vw] md:items-center">
				<div className="font-inter font-bold text-black text-4xl md:text-center md:text-5xl xl:text-6xl">
					Trusted by real<br></br> events!
				</div>
				<p className="text-neutral-400 text-2xl font-semibold font-inter md:text-center md:w-[35vw]">
					Already used by <span className="text-black">200+ guests</span> at <br></br> live events
				</p>
			</div>
			<div className="flex gap-5">
				<OptimizedImage
					src={"/images/landing/social-proof-1"}
					alt={"Schulball 2025"}
					width={500}
					height={100}
					className="rounded-md shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)]"
				/>
				<div className="flex flex-col gap-5">
					<OptimizedImage
						src={"/images/landing/social-proof-1"}
						alt={"Schulball 2025"}
						width={500}
						height={100}
						className="rounded-md shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)]"
					/>
					<OptimizedImage
						src={"/images/landing/social-proof-1"}
						alt={"Schulball 2025"}
						width={500}
						height={100}
						className="rounded-md shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)]"
					/>
				</div>
			</div>

			<div className="text-neutral-700 font-semibold text-md">
				Built from a real problem:<br></br>
				<span className="text-base">
					Choosing music the <span className="text-company">whole event enjoys.</span>
				</span>
			</div>
		</section>
	);
}
