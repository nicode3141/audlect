import { HeartIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { LikeIcon } from "~/components/icons/Song";

export default function Footer() {
	return (
		<footer className="font-montserrat mt-auto flex w-full items-center justify-center bg-[#717171] px-4 py-3 text-sm text-white dark:bg-transparent">
			<div className="grid grid-cols-2 grid-rows-[1.5fr_1fr] gap-4 md:flex md:w-full md:max-w-svh md:grid-cols-1 md:grid-rows-1 md:justify-around">
				<div className="flex flex-col gap-2 md:gap-0.5">
					<span className="inline font-bold text-pretty">
						built with <HeartIcon strokeWidth="2" className="inline w-4 align-middle" /> by{" "}
						<Link
							href={"https://github.com/nicode3141"}
							className="text-gray-200 underline transition-all hover:text-black"
						>
							nicode3141
						</Link>
					</span>
					<Link className="font-bold dark:text-gray-300" href={"mailto:info@nicodenetworks.com"}>
						Report a problem
					</Link>
				</div>
				<div className="flex flex-col gap-1 text-right font-bold text-gray-300 md:flex-row md:gap-2 md:text-center">
					<Link href={"/legal/terms"} className="underline transition-all hover:text-black">
						Terms and Conditions
					</Link>
					<Link href={"/legal/privacy"} className="underline transition-all hover:text-black">
						Privacy Policy
					</Link>
					<Link href={"/legal/cookies"} className="underline transition-all hover:text-black">
						Cookies Notice
					</Link>
				</div>
				<div className="pt-2 md:pt-0">
					<div className="flex flex-col text-gray-300">
						<span className="font-bold">Mail:</span>
						<Link
							href={"mailto:info@nicodenetworks.com"}
							className="font-semibold underline transition-all hover:text-black"
						>
							info@nicodenetworks.com
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
