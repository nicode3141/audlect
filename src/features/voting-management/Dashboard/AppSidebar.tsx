import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "~/components/ui/@shadcn/sidebar";

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup />
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
