import { Cog } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "~/shared/ui/badge";
import { Separator } from "~/shared/ui/separator";
import { SidebarTrigger } from "~/shared/ui/sidebar";

export default function SiteHeader() {
	return (
		<header className="flex items-center p-3">
			<div className="flex items-center flex-1">
				<SidebarTrigger className="" />
				<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
				<div className="flex items-center gap-3">
					<h1 className="text-base font-semibold hidden sm:block">Audlect Voting</h1>
					<Badge className="bg-success/15 text-success hover:bg-success/20 border-0">active</Badge>
				</div>
			</div>
			<Link href={"/dashboard/settings"}>
				<Cog />
			</Link>
		</header>
	);
}
