import React, { useEffect, useState } from "react";
import OptionalTime from "~/shared/components/OptionalTime";
import type { SettingsData } from "~/features/dashboard/hooks/useDashboard";

interface DateSettingsProps {
	settings: SettingsData;
}

export default function DateSettings({ settings }: DateSettingsProps) {
	const [startTime, setStartTime] = useState<Date | undefined>(undefined);
	const [endTime, setEndTime] = useState<Date | undefined>(undefined);

	useEffect(() => {
		setStartTime(settings?.starts_at ?? undefined);
		setEndTime(settings?.ends_at ?? undefined);
	}, [settings?.starts_at, settings?.ends_at]);

	return (
		<div className="flex flex-col gap-3">
			<OptionalTime date={startTime} setDate={setStartTime} title={"Start Time"} />
			<OptionalTime date={endTime} setDate={setEndTime} title={"End Time"} className="pb-5" />
		</div>
	);
}
