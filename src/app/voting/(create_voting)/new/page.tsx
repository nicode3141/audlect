import React from "react";
import CreateVoting from "~/components/layout/CreateVoting/CreateVoting";
import AudlectHeader from "~/components/ui/AudlectHeader/AudlectHeader";
import { LoginWarnProvider } from "~/context/LoginWarningContext";

export default function page() {
	return (
		<LoginWarnProvider>
			<AudlectHeader headerTitle={"Create New Voting"} redirectUrl={"/voting"} />
			<CreateVoting />
		</LoginWarnProvider>
	);
}
