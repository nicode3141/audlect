"use client";

import React from "react";
import AdditionalSettings from "~/features/dashboard/components/settings/AdditionalSettings";
import ComboSettings from "~/features/dashboard/components/settings/SelectSettings";
import DateSettings from "~/features/dashboard/components/settings/DateSettings";
import TitleSettings from "~/features/dashboard/components/settings/TitleSettings";
import PrivacySettings from "~/features/dashboard/components/settings/PrivacySettings";
import { useParams } from "next/navigation";
import { useSettings } from "~/features/dashboard/hooks/useDashboard";
import { Separator } from "~/shared/ui/separator";

export default function Page() {
	const { votingId } = useParams<{ votingId: string }>();
	const { data: settings } = useSettings(votingId);

	if (!settings) return null;

	return (
		<div className="px-4 pb-6 md:max-w-3xl md:mx-auto md:pt-20">
			<div
				className="md:border md:rounded-xl md:overflow-hidden md:divide-y md:dark:divide-neutral-400
					md:border-neutral-300 md:shadow md:w-[40vw]"
			>
				<div className="px-6 py-4 md:bg-neutral-50 md:dark:bg-neutral-800/20">
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
						<div className="font-semibold text-sm md:text-base">Privacy</div>
						<div className="text-xs text-muted-foreground">Control who can see your voting</div>
					</div>
					<div className="px-2">
						<PrivacySettings settings={settings} />
					</div>
				</div>
				<Separator decorative className="md:hidden" />
				<div className="p-6 px-2 md:px-6">
					<div className="mb-4">
						<div className="font-semibold text-sm md:text-base">Schedule</div>
						<div className="text-xs text-muted-foreground">Set when your voting starts and ends</div>
					</div>

					<div className="px-2">
						<DateSettings settings={settings} />
					</div>
				</div>
				<Separator decorative className="md:hidden" />
				<div className="grid grid-cols-1 md:grid-cols-[200px_1fr] md:items-center gap-4 md:gap-8 p-6 px-2 md:px-6">
					<div>
						<div className="font-semibold text-sm md:text-base">Limits</div>
						<div className="text-xs text-muted-foreground">Songs and likes per participant</div>
					</div>
					<div className="px-2">
						<ComboSettings settings={settings} />
					</div>
				</div>
				<Separator decorative className="md:hidden" />
				<div className="grid grid-cols-1 md:grid-cols-[200px_1fr] md:items-center gap-4 md:gap-8 p-6 px-2 md:px-6">
					<div>
						<div className="font-semibold text-sm md:text-base">Moderation</div>
						<div className="text-xs text-muted-foreground">Approval and content filtering</div>
					</div>
					<div className="px-2">
						<AdditionalSettings settings={settings} />
					</div>
				</div>
			</div>
		</div>
	);
}
