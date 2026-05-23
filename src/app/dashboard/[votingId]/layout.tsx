"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "~/shared/ui/sidebar";
import AppSidebar from "~/features/dashboard/components/AppSidebar";
import SiteHeader from "~/features/dashboard/components/SiteHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar></AppSidebar>
			<SidebarInset>
				<SiteHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
