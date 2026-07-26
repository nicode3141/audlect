import React from "react";
import CreateVoting from "~/features/votings/components/CreateVoting";
import AudlectHeader from "~/shared/components/AudlectHeader";
import { LoginWarnProvider } from "~/shared/components/LoginWarningContext";

export default async function page({
	searchParams,
}: {
	searchParams: Promise<{ name?: string }>;
}) {
	const { name } = await searchParams;

	return (
		<LoginWarnProvider>
			<AudlectHeader headerTitle={"Create New Voting"} redirectUrl={"/voting"} />
			<CreateVoting initialName={name} />
		</LoginWarnProvider>
	);
}
