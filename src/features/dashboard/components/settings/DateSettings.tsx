import React, { useEffect, useState } from "react";
import OptionalTime from "~/shared/components/OptionalTime";
import { useUpdateSettings, type SettingsData } from "~/features/dashboard/hooks/useDashboard";
import { toast } from "sonner";

interface DateSettingsProps {
	settings: SettingsData;
}

export default function DateSettings({ settings }: DateSettingsProps) {
	const setting = useUpdateSettings();

	const [startTime, setStartTime] = useState<Date | undefined>(undefined);
	const [endTime, setEndTime] = useState<Date | undefined>(undefined);

	useEffect(() => {
		setStartTime(settings?.starts_at ?? undefined);
		setEndTime(settings?.ends_at ?? undefined);
	}, [settings?.starts_at, settings?.ends_at]);

	function resetSettings() {
		setStartTime(settings?.starts_at ?? undefined);
		setEndTime(settings?.ends_at ?? undefined);
	}

	function startsAfterEnds(startDate: Date, endDate: Date) {
		if (startDate.getTime() >= endDate.getTime()) {
			return true;
		} else {
			return false;
		}
	}

	function updateStartDate(date: Date | undefined) {
		if (settings?.voting_id === undefined) {
			toast.error("Please slow down.");
			return;
		}

		if (date && endTime && startsAfterEnds(date, endTime)) {
			toast.error("Start time must be before end time");
			resetSettings();
			return;
		}

		setting.mutate({ voting_id: settings.voting_id, starts_at: date ?? null });

		setStartTime(date);
		if (!date) return;
		toast.success(
			`Start date has been set to ${date?.toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
			})}`,
		);
	}

	function updateEndDate(date: Date | undefined) {
		if (settings?.voting_id === undefined) {
			toast.error("Please slow down.");
			return;
		}

		if (date && startTime && startsAfterEnds(startTime, date)) {
			toast.error("Start time must be before end time");
			resetSettings();
			return;
		}

		setting.mutate({ voting_id: settings.voting_id, ends_at: date ?? null });

		setEndTime(date);
		if (!date) return;
		toast.success(
			`End date has been set to ${date?.toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
			})}`,
		);
	}

	return (
		<div className="flex flex-col gap-3">
			<OptionalTime date={startTime} setDate={updateStartDate} title={"Start Time"} />
			<OptionalTime date={endTime} setDate={updateEndDate} title={"End Time"} className="pb-5" />
		</div>
	);
}
