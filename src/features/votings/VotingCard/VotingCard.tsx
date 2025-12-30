import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Disc3, ExternalLink } from "lucide-react";

interface VotingCardProps {
	votingId: string;
	shortId: string;
	title: string;
	description: string;
	coverImageUrl: string | null | undefined;
}

export default function VotingCard({ shortId, title, description, coverImageUrl }: VotingCardProps) {
	return (
		<div className="flex flex-col gap-2 rounded-md border border-gray-300 p-2 shadow-sm hover:shadow-md md:place-self-auto dark:border-none dark:bg-[#252525] dark:drop-shadow-sm dark:drop-shadow-gray-600">
			<div className="flex-[3]">
				{coverImageUrl ? (
					<Image
						src={`${coverImageUrl}`}
						alt="Voting Preview"
						width={400}
						height={200}
						className="aspect-8/4 w-[90vw] rounded-sm object-cover"
					/>
				) : (
					<div className="flex aspect-[8/4] items-center justify-center rounded-sm bg-gradient-to-br from-stone-50 to-slate-100 dark:from-stone-900 dark:to-stone-950">
						<Disc3 strokeWidth={1.5} className="h-10 w-10 text-gray-400" />
					</div>
				)}
			</div>
			<div className="max-w-[90vw] px-1 pb-1">
				<div className="font-inter truncate dark:text-white">
					<div className="truncate text-3xl font-semibold">{title}</div>
					<div className="text-xl font-normal text-gray-500 dark:text-gray-300">{description}</div>
				</div>
				<Link
					className="align-center mt-2 inline-block flex-row justify-center rounded-sm bg-gray-950 p-2 px-3 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-700"
					href={`/voting/${shortId}`}
				>
					<ExternalLink strokeWidth={2} className="text-bold mr-2 inline-block h-6 w-6 pb-0.5" />
					<span className="font-semibold">Open Voting</span>
				</Link>
			</div>
		</div>
	);
}
