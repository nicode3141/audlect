"use client";
import { delay, motion, useInView, useReducedMotion } from "motion/react";
import * as React from "react";

export function TextFade({
	direction,
	children,
	className = "",
	staggerChildren = 0.1,
	delay = 0,
}: {
	direction: "up" | "down";
	children: React.ReactNode;
	className?: string;
	staggerChildren?: number;
	delay?: number;
}) {
	const shouldReduceMotion = useReducedMotion();
	const yOffset = shouldReduceMotion ? 0 : 18;

	const FADE_DOWN = {
		show: { opacity: 1, y: 0, transition: { type: "spring" as const } },
		hidden: { opacity: 0, y: direction === "down" ? -yOffset : yOffset },
	} as const;
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? "show" : ""}
			variants={{
				hidden: {},
				show: {
					transition: {
						delayChildren: delay,
						staggerChildren: staggerChildren,
					},
				},
			}}
			className={className}
		>
			{React.Children.map(children, (child) =>
				React.isValidElement(child) ? <motion.div variants={FADE_DOWN}>{child}</motion.div> : child,
			)}
		</motion.div>
	);
}
