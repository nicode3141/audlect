"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { SignIn } from "~/components/oldauth/sign-in";
import { SignUp } from "~/components/oldauth/sign-up";
import { ArrowDown, ArrowLeft } from "~/components/icons/Arrows";
import { SingOut } from "~/components/oldauth/sign-out";
import { nop } from "~/lib/utils";
import { UserButton } from "@daveyplate/better-auth-ui";

interface VotingHeaderProps {
	votingTitle: string;
}

export default function VotingHeader({ votingTitle }: VotingHeaderProps) {
	const { data: session, isPending, error, refetch } = authClient.useSession();

	return (
		<div className="inline-flex w-full items-center justify-between self-stretch px-3 py-2">
			<Link className="flex items-center gap-4" href={"/"} onClick={() => history.back()}>
				<ArrowLeft />
				<div className="font-montserrat text-lg font-bold text-gray-500 dark:text-gray-200">{votingTitle}</div>
			</Link>
			<div>
				<div className="flex cursor-pointer items-center gap-3">
					<button onClick={() => nop} aria-label="user-menu">
						<ArrowDown />
					</button>
					{session ? (
						<>
							<UserButton />
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
