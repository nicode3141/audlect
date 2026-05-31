"use client";

import React from "react";
import AudlectHeader from "~/shared/components/AudlectHeader";
import UserVotings from "~/features/votings/components/UserVotings/UserVotings";
import { useAuthenticate } from "~/features/auth/hooks/auth/useAuthenticate";

export default function Page() {
	useAuthenticate();

	return (
		<>
			<AudlectHeader headerTitle={"Dashboard"} redirectUrl={"/"} />
			<UserVotings />
		</>
	);
}
