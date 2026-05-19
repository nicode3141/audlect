"use client";

import { Cog, ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "~/components/ui/@shadcn/separator";
import { api } from "~/trpc/react";

export default function UserVotings() {
	const { data: ownVotings, isLoading, error } = api.votings.getOwnVotings.useQuery({ limit: 30, page: 0 });

	return (
		<>
			<div className="pt-2">
				<div className="font-montserrat font-semibold text-2xl">Your Votings</div>
				<div className="font-montserrat text-gray-500 dark:text-gray-400">manage Votings</div>
			</div>
			<div className="flex flex-col gap-4 pt-6 px-2">
				{ownVotings?.map((voting) => (
					<>
						<div className="flex justify-evenly items-center p-2 gap-4">
							<div className="flex-1 min-w-0">
								<div className="font-montserrat font-semibold truncate">{voting.name}</div>
								<div className="font-montserrat text-gray-500 dark:text-gray-400 text-xs truncate">
									{voting.description || "Audlect Voting"}
								</div>
							</div>
							<div className="font-inter text-gray-500 dark:text-gray-400 text-xs flex-wrap">Today, 10:24 AM</div>
							<div className="flex gap-2 justify-end">
								<Link href={"/dashboard/123"} className="p-2 bg-gray-200 rounded-lg">
									<Cog className="text-black" size={20} />
								</Link>
								<Link href={`/voting/${voting.short_id}`} className="p-2 bg- rounded-lg bg-company">
									<ExternalLink size={20} />
								</Link>
							</div>
						</div>
						<Separator />
					</>
				))}
			</div>
		</>
	);
}
