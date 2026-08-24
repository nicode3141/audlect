"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
	const pathname = usePathname();

	return (
		<div className="flex flex-col gap-4 items-center justify-center overflow-hidden pt-[30vh]">
			<div className="text-center font-montserrat font-extrabold text-3xl max-w-110">
				Couldn’t find what you were looking for
			</div>
			<div className="text-center font-inter font-medium text-xl max-w-110">
				The requested page <span className="text-neutral-500">“{pathname}”</span> {`couldn’t be found`}
			</div>
			<Link
				className="align-center mt-4 inline-block flex-row justify-center rounded-md bg-[#415FFF]/55 p-2 px-3 text-white
					shadow-[0px_4px_4px_0px_rgba(65,95,255,0.15)] hover:bg-company duration-300"
				href={`/voting/`}
			>
				<ArrowUpRight strokeWidth={2} className="text-bold font-montserrat mr-2 inline-block h-7 w-7 pb-0.5" />
				<span className="font-semibold">Homepage</span>
			</Link>
		</div>
	);
}
