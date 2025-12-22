"use client";

import { SignedIn, SignedOut, SignInButton, useClerk, UserButton } from "@clerk/nextjs";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { SignIn } from "~/components/auth/sign-in";
import { SignUp } from "~/components/auth/sign-up";
import { ArrowDown, ArrowLeft } from "~/components/icons/Arrows";
import { SingOut } from "~/components/auth/sign-out";

interface VotingHeaderProps {
	votingTitle: string;
}

export default function VotingHeader({ votingTitle }: VotingHeaderProps) {
	const { openUserProfile } = useClerk();
	const { data: session, isPending, error, refetch } = authClient.useSession();

	return (
		<div className="inline-flex w-full items-center justify-between self-stretch px-3 py-2">
			<Link className="flex items-center gap-4" href={"/"} onClick={() => history.back()}>
				<ArrowLeft />
				<div className="font-montserrat text-lg font-bold text-gray-500 dark:text-gray-200">{votingTitle}</div>
			</Link>
			<div>
				<div className="flex cursor-pointer items-center gap-3">
					<button onClick={() => openUserProfile()} aria-label="user-menu">
						<ArrowDown />
					</button>
					{session ? (
						<>
							<span className="">Signed in as {session.user?.name}</span>
							<SingOut />
						</>
					) : (
						<>
							<SignIn />
							<SignUp />
						</>
					)}
				</div>
			</div>
		</div>
	);
}
