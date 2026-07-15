"use client";

import React from "react";
import { useVoting } from "../context/VotingContext";
import DeadlineCountdown from "./DeadlineCountdown";

export default function VotingInfoBar() {
	const { startsAt, endsAt } = useVoting();

	console.log(startsAt);

	const showInfo = startsAt !== null || endsAt !== null;
	return showInfo ? <DeadlineCountdown startsAt={startsAt} endsAt={endsAt} /> : <div className="hidden" />;
}
