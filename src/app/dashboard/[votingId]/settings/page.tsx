"use client";

import React, { useEffect, useState } from "react";
import AdditionalSettings from "~/features/dashboard/components/settings/AdditionalSettings";
import ComboSettings from "~/features/dashboard/components/settings/SelectSettings";
import DateSettings from "~/features/dashboard/components/settings/DateSettings";
import TitleSettings from "~/features/dashboard/components/settings/TitleSettings";
import { Card, CardContent } from "~/shared/ui/card";
import { Checkbox } from "~/shared/ui/checkbox";
import { Separator } from "~/shared/ui/separator";
import PrivacySettings from "~/features/dashboard/components/settings/PrivacySettings";
import { useParams } from "next/navigation";
import { useSettings, useUpdateSettings } from "~/features/dashboard/hooks/useDashboard";

export default function Page() {
	return (
		<div className="px-4 pb-6">
			<div className="px-6 py-4 pb-10">
				<span className="font-montserrat font-semibold text-xl">Settings</span>
				<div className="font-montserrat text-sm">Customize your own voting to fit your needs.</div>
			</div>
			<Card>
				<CardContent className="flex flex-col gap-3 p-3 px-4">
					<TitleSettings />
					<PrivacySettings />
					<Separator decorative />
					<DateSettings />
					<Separator decorative />
					<ComboSettings />
					<Separator decorative />
					<AdditionalSettings />
				</CardContent>
			</Card>
		</div>
	);
}
