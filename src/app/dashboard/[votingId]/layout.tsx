"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "~/shared/ui/sidebar";
import AppSidebar from "~/features/dashboard/components/AppSidebar";
import SiteHeader from "~/features/dashboard/components/SiteHeader";
import { useAuthenticate } from "~/features/auth/hooks/auth/useAuthenticate";
import { useParams } from "next/navigation";
import { useSettings } from "~/features/dashboard/hooks/useDashboard";
import { Skeleton } from "~/shared/ui/skeleton";
import LoadingSpinner from "~/features/voting/components/LoadingSpinner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	useAuthenticate();
	const { votingId } = useParams<{ votingId: string }>();
	const { isLoading } = useSettings(votingId);

	if (isLoading) {
		return <LoadingSpinner />;
	}

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
