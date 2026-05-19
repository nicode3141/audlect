import React from "react";
import AudlectHeader from "~/components/ui/AudlectHeader/AudlectHeader";
import UserVotings from "~/features/voting-management/UserVotings/UserVotings";

export default function page() {
	return (
		<>
			<AudlectHeader headerTitle={"Dashboard"} redirectUrl={"/"} />
			<UserVotings />
		</>
	);
}
