"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

interface IVotingContext {
	votingId: string;
	votingShortId: string;
	startsAt: Date | null;
	endsAt: Date | null;
	isActive: boolean;
}

const VotingContext = createContext<IVotingContext | undefined>(undefined);

function computeIsActive(startsAt: Date | null, endsAt: Date | null): boolean {
	const now = Date.now();
	if (startsAt && now < startsAt.getTime()) return false;
	if (endsAt && now > endsAt.getTime()) return false;
	return true;
}

interface IVotingProvider {
	votingId: string;
	votingShortId: string;
	startsAt: Date | null;
	endsAt: Date | null;
	children: React.ReactNode;
}

export const VotingProvider = (props: IVotingProvider) => {
	const { votingId, votingShortId, startsAt, endsAt, children } = props;

	const [isActive, setIsActive] = useState(() => computeIsActive(startsAt, endsAt));

	const startsAtRef = useRef(startsAt);
	const endsAtRef = useRef(endsAt);
	startsAtRef.current = startsAt;
	endsAtRef.current = endsAt;

	useEffect(() => {
		setIsActive(computeIsActive(startsAt, endsAt));

		const interval = setInterval(() => {
			setIsActive(computeIsActive(startsAtRef.current, endsAtRef.current));
		}, 1000);

		return () => clearInterval(interval);
	}, [startsAt, endsAt]);

	const value = useMemo(
		() => ({
			votingId,
			votingShortId,
			startsAt,
			endsAt,
			isActive,
		}),
		[votingId, votingShortId, startsAt, endsAt, isActive],
	);

	return <VotingContext.Provider value={value}>{children}</VotingContext.Provider>;
};

export const useVoting = () => {
	const ctx = useContext(VotingContext);
	if (!ctx) throw new Error("useVoting must be used within a VotingProvider");

	return ctx;
};
