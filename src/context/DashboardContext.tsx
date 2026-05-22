"use client";

import { createContext, useContext } from "react";

interface IDashboardContext {
	votingId: string;
	votingShortId: string;
}

const DashboardContext = createContext<IDashboardContext | undefined>(undefined);

interface IDashboardProvider {
	votingId: string;
	votingShortId: string;
	children: React.ReactNode;
}

export const DashboardProvider = (props: IDashboardProvider) => {
	const { votingId, votingShortId, children } = props;

	return (
		<DashboardContext.Provider value={{ votingId: votingId, votingShortId: votingShortId }}>
			{children}
		</DashboardContext.Provider>
	);
};

export const useDashboard = () => {
	const ctx = useContext(DashboardContext);
	if (!ctx) throw new Error("useDashboard must be used within a DashboardProvider");

	return ctx;
};
