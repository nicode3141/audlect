import React from "react";
import CreateVoting from "~/features/votings/components/CreateVoting";
import AudlectHeader from "~/shared/components/AudlectHeader";
import { LoginWarnProvider } from "~/shared/components/LoginWarningContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create a Music Voting",
	description: "Set up a collaborative music voting for your event in under 2 minutes. Free to use.",
	alternates: {
		canonical: "https://audlect.nicodenetworks.com/voting/new",
	},
};

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
