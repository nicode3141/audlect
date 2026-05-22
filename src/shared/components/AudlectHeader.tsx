"use client";

import Link from "next/link";
import React from "react";
import { UserButton } from "~/features/auth/components/auth/user-button";
import { ArrowLeft } from "~/shared/icons/Arrows";
import { authClient } from "~/lib/auth-client";
import { SignIn } from "~/features/auth/components/SignInBtn";
import PlayIcon from "~/shared/icons/PlayIcon";

interface AudlectHeaderProps {
	headerTitle: string;
	redirectUrl: string;
}

export default function AudlectHeader({ headerTitle, redirectUrl }: AudlectHeaderProps) {
	const { data: session, isPending } = authClient.useSession();

	return (
		<div className="inline-flex w-full items-center justify-between self-stretch px-3 py-2">
			<Link className="flex items-center gap-4" href={redirectUrl}>
				<ArrowLeft />
				<div className="font-montserrat text-lg font-bold text-gray-500 dark:text-gray-200">{headerTitle}</div>
			</Link>
			<div>
				<div className="flex cursor-pointer items-center gap-3">
					{!isPending && (session ? <UserButton size={"icon"} /> : <SignIn />)}
					{isPending && <PlayIcon type="loading" className="m-2 h-6 w-6" />}
				</div>
			</div>
		</div>
	);
}
