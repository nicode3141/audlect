import Image from "next/image";
import React from "react";

export default function ShareFeature() {
	return (
		<section className="flex flex-col items-center gap-10 p-5 py-20 w-full">
			<div className="flex flex-col gap-1">
				<div className="font-inter font-bold text-neutral-900 text-4xl">Share your events </div>
				<p className="text-neutral-500 text-xl font-medium font-montserrat">
					Invite friends to your party and let them vote!
				</p>
			</div>
			<div className="py-3 px-1 bg-white border border-neutral-300 rounded-xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
				<Image
					src={"/images/landing/mockup-share-light.avif"}
					alt={"share page product shot"}
					width={300}
					height={100}
				/>
			</div>
		</section>
	);
}
