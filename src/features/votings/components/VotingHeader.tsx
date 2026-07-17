"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { SignIn } from "~/features/auth/components/SignInBtn";
import { ArrowLeft } from "~/shared/icons/Arrows";
import { UserButton } from "~/features/auth/components/auth/user-button";
import { api } from "~/trpc/react";
import { SlidersHorizontal } from "lucide-react";

interface VotingHeaderProps {
	votingTitle: string;
	votingId: string;
	votingShortId: string;
}

export default function VotingHeader({ votingTitle, votingId, votingShortId }: VotingHeaderProps) {
	const { data: session } = authClient.useSession();

	const { data: membership } = api.votings.getMyMembership.useQuery({ voting_id: votingId });

	return (
		<div className="inline-flex w-full items-center justify-between self-stretch px-3 py-2">
			<div className="flex items-center gap-2">
				<Link className="flex items-center gap-4" href={"/voting"}>
					<ArrowLeft />
					<div className="font-montserrat text-lg font-bold text-gray-500 dark:text-gray-200">{votingTitle}</div>
				</Link>
				{membership?.role === "moderator" ||
					(membership?.role === "owner" && (
						<Link href={`/dashboard/${votingShortId}`}>
							<SlidersHorizontal
								size={18}
								className="text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-100"
								strokeWidth={2.5}
							/>
						</Link>
					))}
			</div>

			<div>
				<div className="flex cursor-pointer items-center gap-3">
					{session ? <UserButton size={"icon"} /> : <SignIn />}
				</div>
			</div>
		</div>
	);
}
