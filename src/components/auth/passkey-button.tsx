import { FingerprintIcon } from "lucide-react";
import { useContext } from "react";

import type { AuthViewClassNames } from "./auth-view";
import type { AuthLocalization } from "~/localization/auth-localization";
import { AuthUIContext } from "~/lib/auth/auth-ui-provider";
import { getLocalizedError } from "~/lib/auth/utils";
import { cn } from "~/lib/utils";
import { useOnSuccessTransition } from "~/hooks/auth/use-success-transition";
import { Button } from "./ui/button";

interface PasskeyButtonProps {
	classNames?: AuthViewClassNames;
	isSubmitting?: boolean;
	localization: Partial<AuthLocalization>;
	redirectTo?: string;
	setIsSubmitting?: (isSubmitting: boolean) => void;
}

export function PasskeyButton({
	classNames,
	isSubmitting,
	localization,
	redirectTo,
	setIsSubmitting,
}: PasskeyButtonProps) {
	const { authClient, localization: contextLocalization, toast, localizeErrors } = useContext(AuthUIContext);

	localization = { ...contextLocalization, ...localization };

	const { onSuccess } = useOnSuccessTransition({ redirectTo });

	const signInPassKey = async () => {
		setIsSubmitting?.(true);

		try {
			const response = await authClient.signIn.passkey({
				fetchOptions: { throw: true },
			});

			if (response?.error) {
				toast({
					variant: "error",
					message: getLocalizedError({
						error: response.error,
						localization,
						localizeErrors,
					}),
				});

				setIsSubmitting?.(false);
			} else {
				void onSuccess();
			}
		} catch (error) {
			toast({
				variant: "error",
				message: getLocalizedError({
					error,
					localization,
					localizeErrors,
				}),
			});

			setIsSubmitting?.(false);
		}
	};

	return (
		<Button
			className={cn("w-full", classNames?.form?.button, classNames?.form?.secondaryButton)}
			disabled={isSubmitting}
			formNoValidate
			name="passkey"
			value="true"
			variant="secondary"
			onClick={signInPassKey}
		>
			<FingerprintIcon />
			{localization.SIGN_IN_WITH} {localization.PASSKEY}
		</Button>
	);
}
