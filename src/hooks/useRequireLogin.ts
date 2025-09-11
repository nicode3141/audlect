import { useUser } from "@clerk/nextjs";
import { useCallback } from "react";
import { useLoginWarning } from "~/context/LoginWarningContext";

export function useRequireLogin() {
	const { isSignedIn } = useUser();
	const { triggerLoginWarning } = useLoginWarning();

	const requireLogin = useCallback(
		(action: () => void) => {
			if (!isSignedIn) {
				triggerLoginWarning();
				return;
			}
			action();
		},
		[isSignedIn, triggerLoginWarning],
	);

	return { requireLogin };
}
