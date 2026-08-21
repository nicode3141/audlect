import Image from "next/image";
import React from "react";
import OptimizedImage from "~/shared/components/OptimizedImage";

export default function ShareFeature() {
	return (
		<section className="flex flex-col items-center gap-10 p-5 py-20 w-full md:py-10 md:gap-2 md:pb-3">
			<div className="flex flex-col gap-1 md:order-2 w-full">
				<div className="font-inter font-bold text-neutral-900 text-4xl md:text-3xl xl:text-4xl">Share your events </div>
				<p className="text-neutral-500 text-xl font-medium font-montserrat md:text-2xl md:max-w-90">
					Invite friends to your party and let them vote!
				</p>
			</div>
			<div className="md:bg-neutral-100 md:order-1 w-full h-full flex items-center justify-center md:rounded-lg">
				<div
					className="py-3 px-1 bg-white border border-neutral-300 rounded-xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
						md:w-50"
				>
					<OptimizedImage
						src={"/images/landing/mockup-share-light"}
						alt={"share page product shot"}
						width={300}
						height={60}
						className="select-none w-75 min-h-100 md:min-h-50"
					/>
				</div>
			</div>
		</section>
	);
}
