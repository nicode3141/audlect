"use client";

import { ArrowRight, ArrowUpRight, ChevronDown, TextAlignJustify, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import NavBarHamburger from "./NavBarHamburger";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowLeft } from "~/shared/icons/Arrows";
import DynamicAuthBtn from "../auth/components/DynamicAuthBtn";

const menuListVariants: Variants = {
	visible: {
		transition: { staggerChildren: 0.1, delayChildren: 0.05 },
	},
};

const menuItemVariants: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.35, ease: "easeOut" },
	},
};

export default function LandingNav() {
	const [isNavBarOpen, toggleNavBar] = useState(false);

	return (
		<>
			<nav
				className="flex p-5 bg-black/10 z-30 absolute w-full backdrop-blur-xs text-white md:bg-neutral-50 md:rounded-xl
					md:border-black/5 md:border md:max-w-[90vw] md:shadow-md"
			>
				<Link href={"/"} className="flex items-center gap-2 flex-1">
					<img src={"/app-logo.svg"} alt="Audlect Logo" width={30}></img>
					<span
						className="font-nunito text-white md:text-company text-2xl font-extrabold md:text-[26px] text-shadow-2xs"
					>
						Audlect
					</span>
				</Link>
				<div className="hidden md:flex flex-1 items-center justify-center font-semibold md:text-neutral-700 text-xl">
					<div className="flex space-x-4 items-center justify-center">
						<Link
							href={"/features"}
							className="flex items-center gap-1 px-3 py-2 transition hover:bg-neutral-200/95 rounded-2xl duration-300
								ease-in-out"
						>
							Features
							<ChevronDown />
						</Link>
						<Link
							href={"/"}
							className="px-3 py-2 transition hover:bg-neutral-200/95 rounded-2xl duration-300 ease-in-out"
						>
							About
						</Link>
						<Link
							href={"/pricing"}
							className="px-3 py-2 transition hover:bg-neutral-200/95 rounded-2xl duration-300 ease-in-out"
						>
							Pricing
						</Link>
						<Link
							href={"/voting"}
							className="flex items-center gap-1 px-3 py-2 transition hover:bg-neutral-200/95 rounded-2xl duration-300
								ease-in-out"
						>
							Explore
							<ArrowUpRight />
						</Link>
					</div>
				</div>
				<div className="flex items-center gap-2 font-semibold flex-1 justify-end md:text-black md:font-bold md:text-xl">
					<div className="flex items-center gap-4">
						<DynamicAuthBtn />
						<NavBarHamburger
							className="md:hidden"
							isOpen={isNavBarOpen}
							onToggle={() => toggleNavBar((prev) => !prev)}
						/>

						<Link
							href={"/voting/new"}
							className="hidden xl:block bg-company p-2 rounded-lg text-white bold duration-300 hover:underline
								hover:bg-blue-400 ease-in-out font-semibold text-lg"
						>
							Create your event
						</Link>
					</div>
				</div>
			</nav>
			<AnimatePresence>
				{isNavBarOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { duration: 0.2 } }}
						exit={{ opacity: 0, transition: { duration: 0.15 } }}
						onClick={(e) => {
							if (e.target instanceof Element && !e.target.closest("a, button")) {
								toggleNavBar(false);
							}
						}}
						className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/40 backdrop-blur-xs"
					>
						<div className="flex items-center justify-end p-5">
							<NavBarHamburger isOpen={true} onToggle={() => toggleNavBar((prev) => !prev)} />
						</div>
						<motion.ul
							initial="hidden"
							animate="visible"
							variants={menuListVariants}
							className="p-5 pt-24 flex flex-col gap-10 items-center text-white text-3xl font-extrabold underline
								decoration-3 font-montserrat"
						>
							<motion.li variants={menuItemVariants}>
								<Link href={"/features"} className="">
									Features
								</Link>
							</motion.li>
							<motion.li variants={menuItemVariants}>
								<Link href={"/features"} className="">
									About
								</Link>
							</motion.li>
							<motion.li variants={menuItemVariants}>
								<Link href={"/features"} className="">
									Pricing
								</Link>
							</motion.li>
							<motion.li variants={menuItemVariants}>
								<Link href={"/features"} className="">
									Explore
								</Link>
							</motion.li>
							<motion.li variants={menuItemVariants} className="pt-10">
								<Link href={"/auth/sign-in"} className="flex items-center gap-2">
									Sign in
								</Link>
							</motion.li>
						</motion.ul>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
