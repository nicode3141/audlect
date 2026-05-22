"use client";

import { Loader2 } from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import { useOnSuccessTransition } from "~/features/auth/hooks/auth/useSuccessTransition";
import { AuthUIContext } from "~/lib/auth/auth-ui-provider";

export function AuthCallback({ redirectTo }: { redirectTo?: string }) {
	const {
		hooks: { useIsRestoring },
		persistClient,
	} = useContext(AuthUIContext);

	const isRestoring = useIsRestoring?.();
	const isRedirecting = useRef(false);

	const { onSuccess } = useOnSuccessTransition({ redirectTo });

	useEffect(() => {
		if (isRedirecting.current) return;

		if (!persistClient) {
			isRedirecting.current = true;
			void onSuccess();
			return;
		}

		if (isRestoring) return;

		isRedirecting.current = true;
		void onSuccess();
	}, [isRestoring, persistClient, onSuccess]);

	return <Loader2 className="animate-spin" />;
}
