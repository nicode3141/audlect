'use client';

import 'react-loading-skeleton/dist/skeleton.css';
import {
	VotingSubitle,
	VotingTitle,
} from '~/components/ui/VotingTitle/VotingTitle';
import { useVotingDetails } from '~/hooks/useVotingDetails';

export function VotingDetails() {
	const { data, isLoading } = useVotingDetails(
		'5b0c7148-90cc-4b8f-83a1-dea74841939d',
	);

	return (
		<>
			<div className={`VotingDetails font-inter pt-7 lg:mt-24`}>
				<VotingTitle>{isLoading ? 'Loading...' : data?.name}</VotingTitle>
				<VotingSubitle>
					{isLoading ? 'Loading...' : data?.description}
				</VotingSubitle>
			</div>
		</>
	);
}
