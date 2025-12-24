import { HeartIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { LikeIcon } from "~/components/icons/Song";

export default function Footer() {
	return (
		<footer className="font-montserrat mt-auto w-full bg-[#717171] px-6 py-4 text-sm text-white dark:bg-transparent dark:text-gray-300">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row md:gap-0">
				{/* Left section */}
				<div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
					<span className="font-semibold">
						Built with <span className="text-red-400">♥</span> by{" "}
						<Link
							href="https://github.com/nicode3141"
							className="underline decoration-gray-300 transition-colors hover:text-black dark:hover:text-white"
						>
							nicode3141
						</Link>
					</span>

					<Link
						href="mailto:info@nicodenetworks.com"
						className="text-gray-200 underline transition-colors hover:text-black dark:hover:text-white"
					>
						Report a problem
					</Link>
					<span className="pt-2 font-semibold">Copyright © 2025 Nicolas Pfeifer</span>
				</div>

				{/* Center section (Legal links) */}
				<div className="flex flex-wrap justify-center gap-4 text-center font-semibold text-gray-200">
					<Link
						href="/legal/terms"
						className="underline decoration-gray-300 transition-colors hover:text-black dark:hover:text-white"
					>
						Terms and Conditions
					</Link>
					<Link
						href="/legal/privacy"
						className="underline decoration-gray-300 transition-colors hover:text-black dark:hover:text-white"
					>
						Privacy Policy
					</Link>
					<Link
						href="/legal/cookies"
						className="underline decoration-gray-300 transition-colors hover:text-black dark:hover:text-white"
					>
						Cookies Policy
					</Link>
				</div>

				{/* Right section */}
				<div className="flex flex-col items-center text-center md:items-end md:text-right">
					<span className="font-semibold text-gray-100">Mail</span>
					<Link
						href="mailto:info@nicodenetworks.com"
						className="underline decoration-gray-300 transition-colors hover:text-black dark:hover:text-white"
					>
						info@nicodenetworks.com
					</Link>
				</div>
			</div>
		</footer>
	);
}
