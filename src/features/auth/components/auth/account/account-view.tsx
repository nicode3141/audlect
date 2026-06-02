"use client";

import { Lock, MenuIcon, Undo2, User } from "lucide-react";
import { useContext, useMemo } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "~/shared/ui/drawer";
import { Label } from "~/shared/ui/label";
import type { AuthLocalization } from "~/localization/auth-localization";
import { AuthUIContext } from "~/lib/auth/auth-ui-provider";
import { useAuthenticate } from "~/features/auth/hooks/auth/useAuthenticate";
import { getViewByPath } from "~/lib/auth/utils";
import type { AccountViewPath } from "~/lib/auth/view-paths";
import { cn } from "~/shared/utils/utils";
import { Button } from "~/shared/ui/button";
import { AccountSettingsCards } from "../settings/account-settings-cards";
import { SecuritySettingsCards } from "../settings/security-settings-cards";
import type { SettingsCardClassNames } from "../settings/shared/settings-card";
import { useSearchParams } from "next/navigation";

export interface AccountViewProps {
	className?: string;
	classNames?: {
		base?: string;
		cards?: string;
		drawer?: { menuItem?: string };
		sidebar?: { base?: string; button?: string; buttonActive?: string };
		card?: SettingsCardClassNames;
	};
	localization?: AuthLocalization;
	path?: string;
	pathname?: string;
	view?: AccountViewPath;
	hideNav?: boolean;
	showTeams?: boolean;
}

export function AccountView({
	className,
	classNames,
	localization: localizationProp,
	path: pathProp,
	pathname,
	view: viewProp,
	hideNav,
	showTeams,
}: AccountViewProps) {
	const {
		apiKey,
		teams: teamOptions,
		localization: contextLocalization,
		organization,
		account: accountOptions,
		Link,
	} = useContext(AuthUIContext);

	const searchParams = useSearchParams();
	const redirect = searchParams.get("redirectTo") ?? undefined;

	if (!accountOptions) {
		return null;
	}
	const { enabled: teamsEnabled } = teamOptions ?? {};

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useAuthenticate();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const localization = useMemo(
		() => ({ ...contextLocalization, ...localizationProp }),
		[contextLocalization, localizationProp],
	);

	const path = pathProp ?? pathname?.split("/").pop();

	const view = viewProp ?? getViewByPath(accountOptions.viewPaths, path) ?? "SETTINGS";

	const navItems: {
		view: AccountViewPath;
		label: string;
	}[] = [
		{ view: "SETTINGS", label: localization.ACCOUNT },
		{ view: "SECURITY", label: localization.SECURITY },
	];

	if (teamsEnabled && showTeams) {
		navItems.push({
			view: "TEAMS",
			label: localization.TEAMS,
		});
	}

	if (apiKey) {
		navItems.push({
			view: "API_KEYS",
			label: localization.API_KEYS,
		});
	}

	if (organization) {
		navItems.push({
			view: "ORGANIZATIONS",
			label: localization.ORGANIZATIONS,
		});
	}

	return (
		<div className={cn("flex w-full grow flex-col gap-4 md:flex-row md:gap-12", className, classNames?.base)}>
			{!hideNav && (
				<div className="flex justify-between gap-2 md:hidden">
					<Label className="text-base font-semibold">{navItems.find((i) => i.view === view)?.label}</Label>

					<Drawer>
						<DrawerTrigger asChild>
							<Button variant="outline">
								<MenuIcon />
							</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle className="hidden">{localization.SETTINGS}</DrawerTitle>
							</DrawerHeader>
							<div className="flex flex-col px-4 pb-4">
								{navItems.map((item) => (
									<Link
										key={item.view}
										href={`${accountOptions?.basePath}/${accountOptions?.viewPaths[item.view]}${redirect ? `?redirectTo=${encodeURIComponent(redirect)}` : ""}`}
									>
										<Button
											size="lg"
											className={cn(
												"w-full justify-start px-4 transition-none",
												classNames?.drawer?.menuItem,
												view === item.view ? "font-semibold dark:text-neutral-900" : "text-foreground/70",
											)}
											variant="ghost"
										>
											{item.view === "SETTINGS" && <User />}
											{item.view === "SECURITY" && <Lock />}

											{item.label}
										</Button>
									</Link>
								))}
								{typeof window !== "undefined" && redirect && (
									<Link href={`${redirect}`}>
										<Button
											size="lg"
											onClick={() => console.log(redirect)}
											className={cn(
												"w-full justify-start px-4 transition-none",
												classNames?.sidebar?.button,
												"text-foreground/70",
											)}
											variant="ghost"
										>
											<Undo2 />
											Return to App
										</Button>
									</Link>
								)}
							</div>
						</DrawerContent>
					</Drawer>
				</div>
			)}

			{!hideNav && (
				<div className="hidden md:block">
					<div className={cn("flex w-48 flex-col gap-1 lg:w-60", classNames?.sidebar?.base)}>
						{navItems.map((item) => (
							<Link
								key={item.view}
								href={`${accountOptions?.basePath}/${accountOptions?.viewPaths[item.view]}${redirect ? `?redirectTo=${encodeURIComponent(redirect)}` : ""}`}
							>
								<Button
									size="lg"
									className={cn(
										"w-full justify-start px-4 transition-none dark:text-white",
										classNames?.sidebar?.button,
										view === item.view ? "font-semibold" : "text-foreground/70",
										view === item.view && classNames?.sidebar?.buttonActive,
									)}
									variant="ghost"
								>
									{item.view === "SETTINGS" && <User />}
									{item.view === "SECURITY" && <Lock />}
									{item.label}
								</Button>
							</Link>
						))}
						{typeof window !== "undefined" && redirect && (
							<Link href={`${redirect}`}>
								<Button
									size="lg"
									onClick={() => console.log(redirect)}
									className={cn(
										"w-full justify-start px-4 transition-none",
										classNames?.sidebar?.button,
										"text-foreground/70",
									)}
									variant="ghost"
								>
									<Undo2 />
									Return to App
								</Button>
							</Link>
						)}
					</div>
				</div>
			)}

			{view === "SETTINGS" && <AccountSettingsCards classNames={classNames} localization={localization} />}

			{view === "SECURITY" && <SecuritySettingsCards classNames={classNames} localization={localization} />}

			{view === "ORGANIZATIONS" && organization && <div className="grid w-full gap-4 md:gap-6"></div>}
		</div>
	);
}
