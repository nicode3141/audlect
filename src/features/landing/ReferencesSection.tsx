"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useRef } from "react";
import OptimizedImage from "~/shared/components/OptimizedImage";

export default function ReferencesSection() {
	const containerRef = useRef(null);

	return (
		<section ref={containerRef} className="relative py-30">
			<div className="flex w-full flex-col items-center justify-center gap-10 p-5">
				<div className="flex flex-col gap-1 md:w-[40vw] md:items-center">
					<div className="font-inter font-bold text-black text-4xl md:text-center md:text-5xl xl:text-6xl">
						Trusted by real<br></br> events!
					</div>
					<p className="text-neutral-400 text-2xl font-semibold font-inter md:text-center md:w-[35vw]">
						Already used by <span className="text-black">200+ guests</span> at <br></br> live events
					</p>
				</div>
				<div className="flex gap-5 items-center flex-col md:flex-row">
					<div className="mt-4 relative overflow-hidden rounded-md shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)]">
						<OptimizedImage
							src={"/images/landing/social-proof-5"}
							alt={"Schulball 2025"}
							width={500}
							height={100}
							className="rounded-md object-cover h-96"
						/>
						<div className="absolute bottom-6 left-5 right-3">
							{`${"Schulball' 25 - OHG Wiesloch"}`.split("").map((el, i) => (
								<motion.span
									className="text-white font-montserrat font-semibold text-xl"
									initial={{ opacity: 0, y: 10 }}
									key={"desc" + i}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{
										once: true,
										margin: "-10% 0px -10% 0px",
									}}
									transition={{
										duration: 0.25,
										delay: i / 50,
									}}
								>
									{el}
									{""}
								</motion.span>
							))}{" "}
						</div>
					</div>

					<div className="flex flex-col gap-5 items-center">
						<div className="relative">
							<OptimizedImage
								src={"/images/landing/social-proof-4"}
								alt={"Schulball 2025"}
								width={400}
								height={600}
								className="rounded-md shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] object-cover h-96 md:w-110 w-full"
							/>
							<div className="absolute bottom-6 left-5 right-3">
								{`${"Schulball' 26 - OHGW"}`.split("").map((el, i) => (
									<motion.span
										className="text-white font-montserrat font-semibold text-xl"
										initial={{ opacity: 0, y: 10 }}
										key={"desc" + i}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{
											once: true,
											margin: "-10% 0px -10% 0px",
										}}
										transition={{
											duration: 0.25,
											delay: i / 50,
										}}
									>
										{el}
										{""}
									</motion.span>
								))}{" "}
							</div>
						</div>
						<div className="relative">
							<OptimizedImage
								src={"/images/landing/social-proof-6"}
								alt={"Schulball 2025"}
								width={500}
								height={100}
								className="rounded-md shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)]"
							/>
							<div className="absolute bottom-6 left-5 right-3">
								{`${"Aloha Festival 2025"}`.split("").map((el, i) => (
									<motion.span
										className="text-white font-montserrat font-semibold text-xl"
										initial={{ opacity: 0, y: 10 }}
										key={"desc" + i}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{
											once: true,
											margin: "-10% 0px -10% 0px",
										}}
										transition={{
											duration: 0.25,
											delay: i / 50,
										}}
									>
										{el}
										{""}
									</motion.span>
								))}{" "}
							</div>
						</div>
					</div>
				</div>

				<div className="text-neutral-700 font-semibold text-md text-center">
					Built from a real problem:<br></br>
					<span className="text-base">
						Choosing music the <span className="text-company">whole event enjoys.</span>
					</span>
				</div>
			</div>
		</section>
	);
}
