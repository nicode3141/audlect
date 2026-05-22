"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { SignIn } from "~/features/auth/components/SignInBtn";
import { ArrowLeft } from "~/shared/icons/Arrows";
import { UserButton } from "~/features/auth/components/auth/user-button";

interface VotingHeaderProps {
	votingTitle: string;
}

export default function VotingHeader({ votingTitle }: VotingHeaderProps) {
	const { data: session, isPending, error, refetch } = authClient.useSession();

	return (
		<div className="inline-flex w-full items-center justify-between self-stretch px-3 py-2">
			<Link className="flex items-center gap-4" href={"/voting"}>
				<ArrowLeft />
				<div className="font-montserrat text-lg font-bold text-gray-500 dark:text-gray-200">{votingTitle}</div>
			</Link>
			<div>
				<div className="flex cursor-pointer items-center gap-3">
					{session ? <UserButton size={"icon"} /> : <SignIn />}
				</div>
			</div>
		</div>
	);
}
