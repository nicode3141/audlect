"use client";

import { ChartNoAxesColumnIncreasing, Cog, ExternalLink, Globe, VoteIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import CampaignProgress from "~/features/dashboard/components/CampaignProgress";
import LinkCard from "~/features/dashboard/components/LinkCard";
import StatsCard from "~/features/dashboard/components/StatsCard";
import { useAnalytics, useSettings } from "~/features/dashboard/hooks/useDashboard";
import { Badge } from "~/shared/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/shared/ui/card";
import { Separator } from "~/shared/ui/separator";

export default function Page() {
	const { votingId } = useParams<{ votingId: string }>();
	const { data: settings } = useSettings(votingId);
	const { data: stats } = useAnalytics(votingId);

	return (
		<div className="p-2.5">
			<Card className="">
				<div className="flex flex-col p-2">
					<CardHeader>
						<CardTitle>
							<div className="flex gap-2">
								<div className="font-montserrat text-xl">{settings?.name ?? "Loading..."}</div>
								{settings?.active ? (
									<Badge className="bg-success/15 text-success hover:bg-success/20 border-0 font-montserrat">
										active
									</Badge>
								) : (
									<Badge className="bg-neutral-700 text-gray-200 hover:bg-neutral-300 border-0 font-montserrat">
										inactive
									</Badge>
								)}
							</div>
						</CardTitle>
						<CardDescription>
							<span className="font-montserrat">{settings?.description}</span>
						</CardDescription>
						<CardContent>
							<div className="flex flex-col gap-5">
								<div className="flex font-inter text-sm gap-2.5">
									<Link
										href={`/dashboard/${votingId}/settings`}
										className="px-2 py-1 border rounded-lg flex gap-2 items-center"
									>
										<Cog size={20} />
										Settings
									</Link>
									<Link
										href={`/voting/${votingId}`}
										className="px-2 rounded-lg flex gap-2 items-center truncate bg-company"
									>
										<ExternalLink size={20} />
										Open Live
									</Link>
								</div>
								<LinkCard shortId={votingId} />
								<Separator />
								<CampaignProgress
									startsAt={settings?.starts_at}
									endsAt={settings?.ends_at}
									createdAt={settings?.created_at}
								/>
								<Separator />
								<div className="flex flex-col pt-10 gap-5">
									<StatsCard label="Songs" value={stats?.totalSongs ?? 0} icon={<VoteIcon />} />
									<StatsCard
										label="Total Votes"
										value={stats?.totalLikes ?? 0}
										icon={<ChartNoAxesColumnIncreasing />}
									/>
									<StatsCard label="Participants" value={stats?.participants ?? 0} icon={<Globe />} />
								</div>
							</div>
						</CardContent>
					</CardHeader>
				</div>
			</Card>
		</div>
	);
}
