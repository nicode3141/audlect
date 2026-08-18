import React from "react";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Disc3, ExternalLink } from "lucide-react";

interface VotingCardProps {
	votingId: string;
	shortId: string;
	title: string;
	description: string;
	coverImageUrl: string | null | undefined;
}

export default function VotingCard({ shortId, title, description, coverImageUrl }: VotingCardProps) {
	return (
		<div className="flex flex-col rounded-md shadow-sm hover:shadow-md md:place-self-auto dark:border-none">
			<div className="relative overflow-hidden">
				{coverImageUrl ? (
					<Link href={`/voting/${shortId}`}>
						<Image
							src={`${coverImageUrl}`}
							alt="Voting Preview"
							width={400}
							height={200}
							className="aspect-1 w-full rounded-lg object-cover"
						/>
					</Link>
				) : (
					<div
						className="flex aspect-8/4 items-center justify-center rounded-sm bg-linear-to-br from-stone-50 to-slate-100
							dark:from-stone-900 dark:to-stone-950"
					>
						<Disc3 strokeWidth={1.5} className="h-10 w-10 text-gray-400" />
					</div>
				)}
				<div
					className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black via-black/70 via-65% to-transparent
						pointer-events-none"
				></div>
				<div className="absolute z-10 bottom-0 p-5">
					<div className="font-inter truncate dark:text-white">
						<div className="truncate text-2xl font-semibold font-montserrat">{title}</div>
						<div className="text-xl text-gray-500 dark:text-gray-300 font-montserrat font-medium">{description}</div>
					</div>
					<Link
						className="align-center mt-4 inline-block flex-row justify-center rounded-md bg-[#415FFF]/55 p-2 px-3
							text-white shadow-[0px_4px_4px_0px_rgba(65,95,255,0.15)]"
						href={`/voting/${shortId}`}
					>
						<ArrowUpRight strokeWidth={2} className="text-bold font-montserrat mr-2 inline-block h-7 w-7 pb-0.5" />
						<span className="font-semibold">Open Voting</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
