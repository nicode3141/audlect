"use client";

import { ChevronDown, TextAlignJustify } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import NavBarHamburger from "./NavBarHamburger";

export default function LandingNav() {
	const [isNavBarOpen, toggleNavBar] = useState(false);

	return (
		<nav className="flex p-5 bg-black/10 z-2 absolute w-full backdrop-blur-xs">
			<div className="flex items-center gap-2 flex-1">
				<img src={"/app-logo.svg"} alt="Audlect Logo" width={30}></img>
				<span className="font-nunito text-white text-2xl font-extrabold">Audlect</span>
			</div>
			<div className="hidden md:block">
				<div className="flex space-x-4 items-center justify-center">
					<Link href={""} className="flex">
						Features
						<ChevronDown />
					</Link>
				</div>
			</div>
			<div className="text-white flex items-center gap-2 font-semibold underline">
				<div className="flex items-center gap-3">
					<Link href={"/"}>Sign in</Link>
					<NavBarHamburger isOpen={isNavBarOpen} onToggle={() => toggleNavBar((prev) => !prev)} />
				</div>
			</div>
		</nav>
	);
}
