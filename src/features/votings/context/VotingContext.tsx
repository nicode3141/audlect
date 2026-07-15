"use client";

import { createContext, useContext } from "react";

interface IVotingContext {
	votingId: string;
	votingShortId: string;
	startsAt: Date | null;
	endsAt: Date | null;
}

const VotingContext = createContext<IVotingContext | undefined>(undefined);

interface IVotingProvider {
	votingId: string;
	votingShortId: string;
	startsAt: Date | null;
	endsAt: Date | null;
	children: React.ReactNode;
}

export const VotingProvider = (props: IVotingProvider) => {
	const { votingId, votingShortId, startsAt, endsAt, children } = props;

	return (
		<VotingContext.Provider
			value={{ votingId: votingId, votingShortId: votingShortId, startsAt: startsAt, endsAt: endsAt }}
		>
			{children}
		</VotingContext.Provider>
	);
};

export const useVoting = () => {
	const ctx = useContext(VotingContext);
	if (!ctx) throw new Error("useVoting must be used within a VotingProvider");

	return ctx;
};
