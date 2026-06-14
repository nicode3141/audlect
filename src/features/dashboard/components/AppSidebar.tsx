"use client";

import { Cog, Disc, HelpCircle, Home, QrCode, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { AccountsCard } from "~/features/auth/components/auth/settings/account/accounts-card";
import { NavUser } from "~/shared/components/NavUser";
import { Separator } from "~/shared/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	useSidebar,
} from "~/shared/ui/sidebar";
import { cn } from "~/shared/utils/utils";

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();
	const params = useParams();
	const votingId = params.votingId as string;
	const { setOpen, setOpenMobile, isMobile } = useSidebar();

	const handleNavClick = React.useCallback(() => {
		if (isMobile) {
			setOpenMobile(false);
		} else {
		}
	}, [isMobile, setOpenMobile]);

	const links1 = [
		{ href: `/dashboard/${votingId}`, label: "Dashboard", icon: Home },
		{ href: `/dashboard/${votingId}/participants`, label: "Participants", icon: Users },
		{ href: `/dashboard/${votingId}/songs`, label: "Songs", icon: Disc },
	];

	const links2 = [
		{ href: `/dashboard/${votingId}/settings`, label: "Settings", icon: Cog },
		{ href: `/dashboard/${votingId}/share`, label: "Share", icon: QrCode },
	];

	return (
		<Sidebar collapsible="offcanvas" className="" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<div className="flex items-center gap-4 text-lg font-semibold font-montserrat p-2">
						<div className="p-2 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
							<Image src="/app-logo.svg" alt="Audlect" width={20} height={20} />
						</div>
						<span className="font-montserrat">Audlect</span>
					</div>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="flex gap-5 py-2 px-2">
				<SidebarGroup className="flex gap-5">
					{links1.map(({ href, label, icon: Icon }) => {
						const active = pathname === href;
						return (
							<Link
								key={href}
								className={cn("flex items-center flex-row gap-3 font-semibold", active && "underline")}
								href={href}
								onClick={handleNavClick}
							>
								<span className="hover:font-bold transition-all duration-100 contents">
									<Icon />{" "}
									<span
										className="relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full
											before:rounded-full before:bg-current before:origin-left before:scale-x-0
											before:transition-transform before:duration-300 hover:before:scale-x-100"
									>
										{label}
									</span>
								</span>
							</Link>
						);
					})}
				</SidebarGroup>
				<div className="flex px-5">
					<Separator className="" decorative />
				</div>
				<SidebarGroup className="flex gap-5">
					{links2.map(({ href, label, icon: Icon }) => {
						const active = pathname === href;
						return (
							<Link
								key={href}
								className={cn("flex items-center flex-row gap-3 font-semibold ", active && "underline")}
								href={href}
								onClick={handleNavClick}
							>
								<span className="hover:font-bold transition-all duration-100 contents">
									<Icon />{" "}
									<span
										className="relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full
											before:rounded-full before:bg-current before:origin-left before:scale-x-0
											before:transition-transform before:duration-300 hover:before:scale-x-100"
									>
										{label}
									</span>
								</span>
							</Link>
						);
					})}
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="p-2">
				<Link className="flex flex-row gap-3 text-sm text-gray-300 font-inter font-medium px-3" href={""}>
					{/* TODO: Help Link */}
					<HelpCircle size={20} /> Get Help
				</Link>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
