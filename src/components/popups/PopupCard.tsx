import React from "react";
import { motion } from "motion/react";
import { DividerLine } from "../icons/Lines";

interface IPopupCard {
	title: string;
	subtitle: string;
	children?: React.ReactNode;
	ref?: React.RefObject<HTMLDivElement | HTMLElement | null>;
}

export default function PopupCard(props: IPopupCard) {
	const { title, subtitle, children, ref } = props;
	return (
		<motion.div
			className="fixed bottom-0 left-0 z-50 w-screen rounded-t-4xl bg-[#f1f1f16b] backdrop-blur-xl md:absolute md:top-20 md:right-0 md:left-auto md:w-60 md:bg-white md:backdrop-blur-none dark:bg-[#35353588]"
			key="modal"
			ref={ref as React.RefObject<HTMLDivElement | null>}
			initial={{ height: 0, opacity: 0 }}
			animate={{
				height: "auto",
				opacity: 1,
				transition: {
					type: "spring",
					bounce: 0.3,
					opacity: { delay: 0.025 },
					duration: 0.5,
				},
			}}
			exit={{ height: 0, opacity: 0 }}
			transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
		>
			<div className="flex flex-col items-center justify-center gap-2.5 rounded-xl p-5 md:bg-gray-200 md:dark:bg-[#010101]">
				<span className="font-montserrat truncate text-lg font-semibold md:text-base dark:text-gray-200">{title}</span>
				<span className="font-montserrat w-9/10 truncate text-center text-3xl font-bold md:text-lg dark:text-white">
					{subtitle}
				</span>
				<span className="pb-2.5">
					<DividerLine className="text-black dark:text-white" />
				</span>
				<span className="flex min-w-9/10 flex-col items-center gap-3 pb-12 md:pb-0">{children}</span>
			</div>
		</motion.div>
	);
}
