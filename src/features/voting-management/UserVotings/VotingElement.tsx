import { Cog, ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "~/components/ui/@shadcn/separator";
import { formatRelativeDate } from "~/lib/utils";

interface IVotingElementProps {
	shortId: string;
	votingName: string;
	votingDesc: string;
	votingDate: Date | null;
	length: number;
	index: number;
}

export default function VotingElement({
	shortId,
	votingName,
	votingDesc,
	votingDate,
	length,
	index,
}: IVotingElementProps) {
	return (
		<>
			<div className="flex justify-evenly items-center p-2 gap-4 py-2">
				<div className="flex-1 min-w-0">
					<div className="font-montserrat font-semibold truncate">{votingName}</div>
					<div className="font-montserrat text-gray-500 dark:text-gray-400 text-xs truncate">
						{votingDesc || "Audlect Voting"}
					</div>
				</div>
				<div className="font-inter text-gray-500 dark:text-gray-400 text-xs flex-wrap">
					{formatRelativeDate(votingDate ?? "unknown date")}
				</div>
				<div className="flex gap-2 justify-end">
					<Link href={`/dashboard/${shortId}`} className="p-2 bg-gray-200 rounded-lg">
						<Cog className="text-black" size={20} />
					</Link>
					<Link href={`/voting/${shortId}`} className="p-2 bg- rounded-lg bg-company">
						<ExternalLink size={20} className="text-white" />
					</Link>
				</div>
			</div>
			{index < length - 1 && <Separator className="mt-4" />}
		</>
	);
}
