import { Disc, Home, Users } from "lucide-react";
import Image from "next/image";
import React from "react";
import { AccountsCard } from "~/features/auth/components/auth/settings/account/accounts-card";
import { Separator } from "~/shared/ui/separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu } from "~/shared/ui/sidebar";

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
			<SidebarContent>
				<SidebarGroup className="flex gap-5">
					<SidebarMenu className="flex items-center flex-row gap-3 font-semibold">
						<Home /> Dashboard
					</SidebarMenu>
					<SidebarMenu className="flex items-center flex-row gap-3 font-semibold">
						<Users /> Participants
					</SidebarMenu>
					<SidebarMenu className="flex items-center flex-row gap-3 font-semibold">
						<Disc /> Songs
					</SidebarMenu>
				</SidebarGroup>
				<Separator />
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter></SidebarFooter>
		</Sidebar>
	);
}
