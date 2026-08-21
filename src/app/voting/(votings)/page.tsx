import React from "react";
import VotingsPageLayout from "~/features/voting/components/VotingsPageLayout";
import type { Metadata } from "next";
import Footer from "~/shared/components/AppFooter";

export const metadata: Metadata = {
	title: "Browse Music Votings",
	description: "Discover and join live music voting events. Vote for the songs you want to hear.",
	alternates: {
		canonical: "https://audlect.nicodenetworks.com/voting",
	},
};

export default function page() {
	return (
		<>
			<VotingsPageLayout /> <Footer />
		</>
	);
}
