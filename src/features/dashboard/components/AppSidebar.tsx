import Image from "next/image";
import React from "react";
import { AccountsCard } from "~/features/auth/components/auth/settings/account/accounts-card";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu } from "~/shared/ui/sidebar";

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" className="" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<div className="flex items-center gap-4 text-lg font-semibold font-montserrat p-2">
						<Image src="/app-logo.svg" alt="Audlect" width={20} height={20} />
						Audlect
					</div>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup></SidebarGroup>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter></SidebarFooter>
		</Sidebar>
	);
}
