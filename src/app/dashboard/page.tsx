import React from "react";
import AudlectHeader from "~/shared/components/AudlectHeader";
import UserVotings from "~/features/votings/components/UserVotings/UserVotings";

export default function page() {
	return (
		<>
			<AudlectHeader headerTitle={"Dashboard"} redirectUrl={"/"} />
			<UserVotings />
		</>
	);
}
