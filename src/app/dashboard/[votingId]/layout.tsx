"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "~/shared/ui/sidebar";
import AppSidebar from "~/features/dashboard/components/AppSidebar";
import SiteHeader from "~/features/dashboard/components/SiteHeader";
import { useAuthenticate } from "~/features/auth/hooks/auth/useAuthenticate";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	useAuthenticate();

	return (
		<SidebarProvider className="">
			<AppSidebar className="dark:bg-neutral-700"></AppSidebar>
			<SidebarInset>
				<SiteHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
