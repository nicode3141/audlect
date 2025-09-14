"use client";

import { AnimatePresence, motion } from "motion/react";
import React from "react";

interface ISmoothLabel {
	text: string;
	className: string;
	highlight?: string;
	highlightClass?: string;
	duration?: number;
	delay?: number;
}

interface ISmoothLabelSpan {
	char: string;
	index: string | number;
	duration?: number;
	delay?: number;
	className: string;
}

const SmoothLabelSpan = ({ char, index, duration = 0.25, delay = 0.25, className }: ISmoothLabelSpan) => {
	return (
		<motion.span
			className={`inline-block ${className}`}
			key={index}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: duration,
				delay: (index as number) / 50,
			}}
		>
			{char === " " ? "\u00A0" : char}
		</motion.span>
	);
};

/**
 * WIP!
 *
 * @param props
 * @returns
 */
export default function SmoothLabel(props: ISmoothLabel) {
	const { text, className, highlight, highlightClass } = props;
	return (
		<AnimatePresence>
			<div className={className}>
				{text
					.split("")
					.map((char, i) =>
						highlight && text.startsWith(highlight, i) ? (
							<SmoothLabelSpan char={char} index={i} className={highlightClass ?? className} key={i} />
						) : (
							<SmoothLabelSpan index={i} char={char} key={i} className={className} />
						),
					)}
			</div>
		</AnimatePresence>
	);
}
