"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "~/shared/utils/utils";

interface NavBarHamburgerProps {
	isOpen: boolean;
	onToggle: () => void;
	className?: string;
}

export default function NavBarHamburger({ isOpen, onToggle, className }: NavBarHamburgerProps) {
	const animate = isOpen ? "open" : "closed";

	return (
		<button className={cn("NavBarHamburgerTrigger", className)} onClick={onToggle}>
			<svg width="25" height="25" viewBox="0 0 30 30">
				<motion.path
					fill="transparent"
					strokeWidth="4"
					stroke="white"
					strokeLinecap="round"
					variants={{
						closed: {
							d: "M 2 3 L 28 3",
						},
						open: {
							d: "M 3 27.5 L 27.5 2.5",
						},
					}}
					initial={false}
					animate={animate}
				/>

				<motion.path
					fill="transparent"
					strokeWidth="4"
					stroke="white"
					strokeLinecap="round"
					d="M 2 14 L 28 14"
					variants={{
						closed: {
							opacity: 1,
						},
						open: {
							opacity: 0,
						},
					}}
					initial={false}
					animate={animate}
					transition={{ duration: 0.1 }}
				/>

				<motion.path
					fill="transparent"
					strokeWidth="4"
					stroke="white"
					strokeLinecap="round"
					variants={{
						closed: {
							d: "M 2 25 L 28 25",
						},
						open: {
							d: "M 3 2.5 L 27.5 27.5",
						},
					}}
					initial={false}
					animate={animate}
				/>
			</svg>
		</button>
	);
}
