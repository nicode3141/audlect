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
						<div className="px-6 py-4 pb-10 md:px-0">
							<span className="font-montserrat font-semibold text-xl md:text-3xl">Settings</span>
							<div className="font-montserrat text-sm md:text-lg md:font-medium">
								Customize your own voting to fit your needs.
							</div>
						</div>
						<TitleSettings settings={settings} />
						<PrivacySettings settings={settings} />
						<Separator decorative className="md:hidden" />
						<DateSettings settings={settings} />
						<Separator decorative className="md:hidden" />
						<ComboSettings settings={settings} />
						<Separator decorative className="md:hidden" />
						<AdditionalSettings settings={settings} />
					</CardContent>
				</div>
			</Card>
		</div>
	);
}
