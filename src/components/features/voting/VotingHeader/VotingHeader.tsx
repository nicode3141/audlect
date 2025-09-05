'use client';

import {
	SignedIn,
	SignedOut,
	SignInButton,
	useClerk,
	UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import { ArrowDown, ArrowLeft } from '~/components/icons/Arrows';

interface VotingHeaderProps {
	votingTitle: string;
	onBackClick: () => void;
}

export default function VotingHeader({
	votingTitle,
	onBackClick,
}: VotingHeaderProps) {
	const { openUserProfile } = useClerk();

	return (
		<div className="inline-flex w-full items-center justify-between self-stretch px-3 py-2">
			<Link
				className="flex items-center gap-4"
				href={'/'}
				onClick={onBackClick}
			>
				<ArrowLeft />
				<div className="font-montserrat text-lg font-bold text-gray-500">
					{votingTitle}
				</div>
			</Link>
			<SignedIn>
				<div className="flex cursor-pointer items-center gap-3">
					<button onClick={() => openUserProfile()} aria-label="user-menu">
						<ArrowDown />
					</button>
					<UserButton />
				</div>
			</SignedIn>
			<SignedOut>
				<SignInButton>
					<span className="font-montserrat cursor-pointer text-lg font-bold text-[#242424] underline select-none">
						Sign In
					</span>
				</SignInButton>
			</SignedOut>
		</div>
	);
}
