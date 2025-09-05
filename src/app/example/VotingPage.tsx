'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import VotingHeader from '~/components/features/voting/VotingHeader/VotingHeader';
import VotingLayout from '~/components/layout/VotingLayout/VotingLayout';

/** VotingPage.tsx
 * contains everything non static of the vote.
 * footer, etc inside page.tsx
 */

export default function VotingPage() {
	return (
		<ClerkProvider>
			<VotingHeader
				votingTitle="Audlect Top Songs"
				onBackClick={() => {
					console.log('test');
				}}
			/>
			<VotingLayout />
		</ClerkProvider>
	);
}
