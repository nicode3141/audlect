"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

interface ILoginWarning {
	showWarning: boolean;
	triggerLoginWarning: () => void;
	hideLoginWarning: () => void;
}

const LoginWarningContext = createContext<ILoginWarning | undefined>(undefined);

export const LoginWarnProvider = ({ children }: { children: React.ReactNode }) => {
	const [showWarning, setShowWarning] = useState(false);

	const triggerLoginWarning = useCallback(() => setShowWarning(true), []);
	const hideLoginWarning = useCallback(() => setShowWarning(false), []);

	return (
		<LoginWarningContext.Provider value={{ showWarning, triggerLoginWarning, hideLoginWarning }}>
			{children}
		</LoginWarningContext.Provider>
	);
};

export function useLoginWarning() {
	const ctx = useContext(LoginWarningContext);
	if (!ctx) throw new Error("useLoginWarning must be used within a LoginWarnProvider");

	return ctx;
}
