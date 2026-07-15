"use client";

import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getTimeLeft } from "~/shared/utils/utils";
import type { TimeLeft } from "~/types/global";

const oneDay = 24 * 60 * 60 * 1000;
const oneHour = 60 * 60 * 1000;

export default function DeadlineCountdown({ startsAt, endsAt }: { startsAt: Date | null; endsAt: Date | null }) {
	const [, setTick] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => setTick((t) => t + 1), 1000);
		return () => clearInterval(interval);
	}, []);

	const timeToStart = startsAt ? startsAt.getTime() - Date.now() : null;
	const timeToEnd = endsAt ? endsAt.getTime() - Date.now() : null;

	const isBeforeStart = startsAt && timeToStart && timeToStart > 0;
	const isEndSoon = timeToEnd !== null && timeToEnd > 0 && timeToEnd <= oneDay;

	if (isBeforeStart) {
		return <CountdownStart startsAt={startsAt} />;
	} else if (isEndSoon && endsAt) {
		return <CountdownEnd endsAt={endsAt} />;
	}
	return <></>;
}

function CountdownStart({ startsAt }: { startsAt: Date }): React.JSX.Element {
	const [timeTillStart, setTimeTillStart] = useState<TimeLeft>(() => getTimeLeft(startsAt));

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeTillStart(getTimeLeft(startsAt));
		}, 1000);

		return () => clearInterval(interval);
	}, [startsAt]);

	if (timeTillStart.total < 0) return <></>;
	return (
		<div className="flex w-full items-center justify-center bg-company/20 py-2">
			<div className="font-montserrat font-medium flex items-center justify-center gap-2">
				<Calendar className="text-neutral-700" />
				Voting starts in
				<span className="font-bold">
					{timeTillStart.days > 0 && timeTillStart.days + "d "}
					{timeTillStart.hours > 0 && timeTillStart.hours + "h "}
					{timeTillStart.minutes > 0 && timeTillStart.minutes + "mins "}
					{timeTillStart.seconds}s
				</span>
			</div>
		</div>
	);
}

function CountdownEnd({ endsAt }: { endsAt: Date }): React.JSX.Element {
	const [timeTillEnd, setTimeTillEnd] = useState<TimeLeft>(() => getTimeLeft(endsAt));

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeTillEnd(getTimeLeft(endsAt));
		}, 1000);

		return () => clearInterval(interval);
	}, [endsAt]);

	if (timeTillEnd.total < 0)
		return (
			<div className="flex w-full items-center justify-center bg-company/20 py-2">
				<div className="font-montserrat font-semibold">Voting Deadline has been reached!</div>
			</div>
		);
	return (
		<div className="flex w-full items-center justify-center bg-company/20 py-2">
			<div className="font-montserrat font-medium flex items-center justify-center gap-2">
				<Calendar className="text-neutral-700" />
				Voting ends in
				<span className="font-bold">
					{timeTillEnd.days > 0 && timeTillEnd.days + "d "}
					{timeTillEnd.hours > 0 && timeTillEnd.hours + "h "}
					{timeTillEnd.minutes > 0 && timeTillEnd.minutes + "mins "}
					{timeTillEnd.seconds}s
				</span>
			</div>
		</div>
	);
}

/**
if (timeTillEnd > oneDay) {
		return <div className="hidden w-full items-center justify-center bg-company/20 py-2"></div>;
	} else if (timeTillEnd > oneHour) {
		return (
			<div className="flex w-full items-center justify-center bg-company/20 py-2">
				<div className="font-montserrat font-semibold">Voting ends in </div>
			</div>
		);
	} else if (timeTillEnd > 0) {
		<div className="flex w-full items-center justify-center bg-company/20 py-2">
			<div className="font-montserrat font-semibold">Voting Deadline has been reached!</div>
		</div>;
	} else {
		return (
			<div className="flex w-full items-center justify-center bg-company/20 py-2">
				<div className="font-montserrat font-semibold">Voting Deadline has been reached!</div>
			</div>
		);
	}
	return <div className="font-montserrat font-semibold">Voting ends in </div>; */
