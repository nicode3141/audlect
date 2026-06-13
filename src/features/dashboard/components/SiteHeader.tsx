"use client";

import { Cog } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { Badge } from "~/shared/ui/badge";
import { Separator } from "~/shared/ui/separator";
import { SidebarTrigger } from "~/shared/ui/sidebar";
import { useSettings } from "../hooks/useDashboard";

export default function SiteHeader() {
	const { votingId } = useParams<{ votingId: string }>();
	const { data: settings } = useSettings(votingId);
	return (
		<header className="flex items-center p-3">
			<div className="flex items-center flex-1">
				<SidebarTrigger className="" />
				<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
				<div className="flex items-center gap-3">
					<h1 className="text-base font-semibold hidden sm:block">{settings?.name ?? "Loading..."}</h1>
					<Badge className="bg-success/15 text-success hover:bg-success/20 border-0">active</Badge>
				</div>
			</div>
		</header>
	);
}
