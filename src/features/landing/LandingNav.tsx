import { TextAlignJustify } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LandingNav() {
	return (
		<nav className="flex p-5 bg-black/10 z-2 absolute w-full backdrop-blur-xs">
			<div className="flex items-center gap-2 flex-1">
				<img src={"/app-logo.svg"} alt="Audlect Logo" width={30}></img>
				<span className="font-nunito text-white text-2xl font-extrabold">Audlect</span>
			</div>
			<div className="text-white flex items-center gap-2 font-semibold underline">
				<Link href={"/"}>Sign in</Link>
				<TextAlignJustify />
			</div>
		</nav>
	);
}
