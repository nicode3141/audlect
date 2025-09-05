import { type Metadata } from 'next';
import VotingPage from './VotingPage';

export const metadata: Metadata = {
	title: 'Audlect Top Songs',
	description: 'Best songs from this month',
};

export default function Voting() {
	return (
		<>
			<VotingPage />
		</>
	);
}
