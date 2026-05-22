"use client";

import type { Session, User } from "better-auth";
import { EllipsisIcon, Loader2, LogOutIcon, RepeatIcon, UserX2Icon } from "lucide-react";
import { useContext, useState } from "react";

import { Button } from "../~/shared/ui/button";
import { Card } from "../../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { UserView } from "../../user-view";
import type { SettingsCardClassNames } from "../shared/settings-card";
import { getLocalizedError } from "~/lib/auth/utils";
import { cn } from "~/shared/utils/utils";
import type { Refetch } from "~/types/auth/refetch";
import type { AuthLocalization } from "~/localization/auth-localization";
import { AuthUIContext } from "~/lib/auth/auth-ui-provider";

export interface AccountCellProps {
	className?: string;
	classNames?: SettingsCardClassNames;
	deviceSession: { user: User; session: Session };
	localization?: Partial<AuthLocalization>;
	refetch?: Refetch;
}

export function AccountCell({ className, classNames, deviceSession, localization, refetch }: AccountCellProps) {
	const {
		basePath,
		localization: contextLocalization,
		hooks: { useSession },
		mutators: { revokeDeviceSession, setActiveSession },
		toast,
		viewPaths,
		navigate,
		localizeErrors,
	} = useContext(AuthUIContext);

	localization = { ...contextLocalization, ...localization };

	const { data: sessionData } = useSession();
	const [isLoading, setIsLoading] = useState(false);

	const handleRevoke = async () => {
		setIsLoading(true);

		try {
			await revokeDeviceSession({
				sessionToken: deviceSession.session.token,
			});

			void refetch?.();
		} catch (error) {
			setIsLoading(false);

			toast({
				variant: "error",
				message: getLocalizedError({
					error,
					localization,
					localizeErrors,
				}),
			});
		}
	};

	const handleSetActiveSession = async () => {
		setIsLoading(true);

		try {
			await setActiveSession({
				sessionToken: deviceSession.session.token,
			});

			void refetch?.();
		} catch (error) {
			toast({
				variant: "error",
				message: getLocalizedError({
					error,
					localization,
					localizeErrors,
				}),
			});
		}

		setIsLoading(false);
	};

	const isCurrentSession = deviceSession.session.id === sessionData?.session.id;

	return (
		<Card className={cn("flex-row p-4", className, classNames?.cell)}>
			<UserView user={deviceSession.user} localization={localization} />

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className={cn("relative ms-auto", classNames?.button, classNames?.outlineButton)}
						disabled={isLoading}
						size="icon"
						type="button"
						variant="outline"
					>
						{isLoading ? <Loader2 className="animate-spin" /> : <EllipsisIcon className={classNames?.icon} />}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent>
					{!isCurrentSession && (
						<DropdownMenuItem onClick={handleSetActiveSession}>
							<RepeatIcon className={classNames?.icon} />

							{localization.SWITCH_ACCOUNT}
						</DropdownMenuItem>
					)}

					<DropdownMenuItem
						onClick={() => {
							if (isCurrentSession) {
								navigate(`${basePath}/${viewPaths.SIGN_OUT}`);
								return;
							}

							void handleRevoke();
						}}
						variant="destructive"
					>
						{isCurrentSession ? (
							<LogOutIcon className={classNames?.icon} />
						) : (
							<UserX2Icon className={classNames?.icon} />
						)}

						{isCurrentSession ? localization.SIGN_OUT : localization.REVOKE}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Card>
	);
}
