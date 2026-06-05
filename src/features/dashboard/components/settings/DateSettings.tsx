import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import OptionalTime from "~/shared/components/OptionalTime";
import { useSettings } from "../../hooks/useDashboard";

export default function DateSettings() {
	const { votingId } = useParams<{ votingId: string }>();
	const { data: settings } = useSettings(votingId);

	const [startTime, setStartTime] = useState<Date | undefined>(undefined);
	const [endTime, setEndTime] = useState<Date | undefined>(undefined);

	useEffect(() => {
		setStartTime(settings?.starts_at ?? undefined);
		setEndTime(settings?.ends_at ?? undefined);
	}, [settings?.starts_at, settings?.ends_at]);

	return (
		<>
			<OptionalTime date={startTime} setDate={setStartTime} title={"Start Time"} />
			<OptionalTime date={endTime} setDate={setEndTime} title={"End Time"} className="pb-5" />
		</>
	);
}
