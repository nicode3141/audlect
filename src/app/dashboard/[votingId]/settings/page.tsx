"use client";

import React from "react";
import AdditionalSettings from "~/features/dashboard/components/settings/AdditionalSettings";
import ComboSettings from "~/features/dashboard/components/settings/SelectSettings";
import DateSettings from "~/features/dashboard/components/settings/DateSettings";
import TitleSettings from "~/features/dashboard/components/settings/TitleSettings";
import { Card, CardContent } from "~/shared/ui/card";
import { Separator } from "~/shared/ui/separator";
import PrivacySettings from "~/features/dashboard/components/settings/PrivacySettings";
import { useParams } from "next/navigation";
import { useSettings } from "~/features/dashboard/hooks/useDashboard";
import SettingsSkeleton from "~/features/dashboard/components/settings/SettingsSkeleton";

export default function Page() {
	const { votingId } = useParams<{ votingId: string }>();
	const { data: settings, isLoading } = useSettings(votingId);

	if (isLoading) return <SettingsSkeleton />;
	if (!settings) return null;

	return (
		<div className="px-4 pb-6">
			<div className="px-6 py-4 pb-10">
				<span className="font-montserrat font-semibold text-xl">Settings</span>
				<div className="font-montserrat text-sm">Customize your own voting to fit your needs.</div>
			</div>
			<Card>
				<CardContent className="flex flex-col gap-3 p-3 px-4">
					<TitleSettings settings={settings} />
					<PrivacySettings settings={settings} />
					<Separator decorative />
					<DateSettings settings={settings} />
					<Separator decorative />
					<ComboSettings settings={settings} />
					<Separator decorative />
					<AdditionalSettings settings={settings} />
				</CardContent>
			</Card>
		</div>
	);
}
