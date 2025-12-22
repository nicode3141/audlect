import { useCallback } from "react";
import { useLoginWarning } from "~/context/LoginWarningContext";
import { useSession } from "~/lib/auth-client";

export function useRequireLogin() {
	const { data: isSignedIn, refetch } = useSession();
	const { triggerLoginWarning } = useLoginWarning();

	const requireLogin = useCallback(
		async (action: () => void) => {
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
