"use client";

import { createContext, useContext } from "react";

interface IVotingContext {
	votingId: string;
	votingShortId: string;
}

const VotingContext = createContext<IVotingContext | undefined>(undefined);

interface IVotingProvider {
	votingId: string;
	votingShortId: string;
	children: React.ReactNode;
}

export const VotingProvider = (props: IVotingProvider) => {
	const { votingId, votingShortId, children } = props;

	return (
		<VotingContext.Provider value={{ votingId: votingId, votingShortId: votingShortId }}>
			{children}
		</VotingContext.Provider>
	);
};

export const useVoting = () => {
	const ctx = useContext(VotingContext);
	if (!ctx) throw new Error("useVoting must be used within a VotingProvider");

	return ctx;
};
