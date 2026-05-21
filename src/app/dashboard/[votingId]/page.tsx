"use client";

import React from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "~/components/ui/@shadcn/sidebar";
import AppSidebar from "~/features/voting-management/Dashboard/AppSidebar";
import SiteHeader from "~/features/voting-management/Dashboard/SiteHeader";

export default function page() {
	return (
		<SidebarProvider>
			<AppSidebar></AppSidebar>
			<SidebarInset>
				<SiteHeader />
			</SidebarInset>
		</SidebarProvider>
	);
}
