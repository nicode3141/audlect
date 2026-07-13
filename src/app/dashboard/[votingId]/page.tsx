"use client";

import { ChartNoAxesColumnIncreasing, Cog, ExternalLink, Globe, VoteIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import CampaignProgress from "~/features/dashboard/components/CampaignProgress";
import LinkCard from "~/features/dashboard/components/LinkCard";
import AdditionalSettings from "~/features/dashboard/components/settings/AdditionalSettings";
import DateSettings from "~/features/dashboard/components/settings/DateSettings";
import PrivacySettings from "~/features/dashboard/components/settings/PrivacySettings";
import ComboSettings from "~/features/dashboard/components/settings/SelectSettings";
import TitleSettings from "~/features/dashboard/components/settings/TitleSettings";
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
			<Card className="dark:text-white md:bg-none md:border-0 md:shadow-none md:max-w-300">
				<div className="flex flex-col p-2 md:p-5">
					<CardHeader>
						<CardTitle>
							<div className="flex gap-2">
								<div className="font-montserrat text-xl md:text-4xl">{settings?.name ?? "Loading..."}</div>
								{settings?.active ? (
									<Badge
										className="bg-success/15 text-success hover:bg-success/20 border-0 font-montserrat md:px-4
											md:rounded-4xl md:py-2"
									>
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
							<span className="font-montserrat md:text-xl md:font-medium">{settings?.description}</span>
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-5 md:pt-3">
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
						<Separator className="md:hidden" />
						<CampaignProgress
							startsAt={settings?.starts_at}
							endsAt={settings?.ends_at}
							createdAt={settings?.created_at}
						/>
						<Separator className="md:hidden" />
						<div className="flex flex-col pt-10 gap-5 md:flex-row md:w-fit">
							<StatsCard label="Songs" value={stats?.totalSongs ?? 0} icon={<VoteIcon />} />
							<StatsCard label="Total Votes" value={stats?.totalLikes ?? 0} icon={<ChartNoAxesColumnIncreasing />} />
							<StatsCard label="Participants" value={stats?.participants ?? 0} icon={<Globe />} />
						</div>
						<Separator className="md:hidden" />

						<div className="md:border md:rounded-xl md:overflow-hidden md:divide-y md:dark:divide-neutral-700 md:mt-10">
							<div className="px-6 py-4 md:bg-neutral-50 md:dark:bg-neutral-800/50">
								<span className="font-montserrat font-semibold text-xl md:text-2xl">Settings</span>
								<div className="font-montserrat text-sm md:text-base text-muted-foreground">
									Customize your voting to fit your needs.
								</div>
							</div>

							<div className="flex flex-col gap-4 p-6 px-2 md:px-6">
								<TitleSettings settings={settings} />
							</div>
							<Separator decorative className="md:hidden" />
							<div className="grid grid-cols-1 md:grid-cols-[200px_1fr] md:items-center gap-4 md:gap-8 p-6 px-2 md:px-6">
								<div>
									<div className="font-semibold text-base md:text-xl">Privacy</div>
									<div className="text-xs text-muted-foreground">Control who can see your voting</div>
								</div>
								<div className="px-2">
									<PrivacySettings settings={settings} />
								</div>
							</div>
							<Separator decorative className="md:hidden" />
							<div className="p-6 px-2 md:px-6">
								<div className="mb-4">
									<div className="font-semibold text-base">Schedule</div>
									<div className="text-xs text-muted-foreground">Set when your voting starts and ends</div>
								</div>
								<div className="px-2">
									<DateSettings settings={settings} />
								</div>
							</div>
							<Separator decorative className="md:hidden" />
							<div className="grid grid-cols-1 md:grid-cols-[200px_1fr] md:items-center gap-4 md:gap-8 p-6 px-2 md:px-6">
								<div>
									<div className="font-semibold text-base">Limits</div>
									<div className="text-xs text-muted-foreground">Songs and likes per participant</div>
								</div>
								<div className="px-2">
									<ComboSettings settings={settings} />
								</div>
							</div>
							<Separator decorative className="md:hidden" />
							<div className="grid grid-cols-1 md:grid-cols-[200px_1fr] md:items-center gap-4 md:gap-8 p-6 px-2 md:px-6">
								<div>
									<div className="font-semibold text-base">Moderation</div>
									<div className="text-xs text-muted-foreground">Approval and content filtering</div>
								</div>
								<div className="px-2">
									<AdditionalSettings settings={settings} />
								</div>
							</div>
						</div>
					</CardContent>
				</div>
			</Card>
		</div>
	);
}
