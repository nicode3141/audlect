import React from "react";
import LegalTemplate from "../LegalTemplate";
import { cookiesContent } from "../[content]/cookies";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cookie Policy",
	description: "How Audlect uses cookies and similar technologies.",
	robots: { index: true },
	alternates: {
		canonical: "https://audlect.nicodenetworks.com/legal/cookies",
	},
};

export default function page() {
	return (
		<LegalTemplate
			title={"Cookies Notice"}
			website={"nicode networks - nicodenetworks.com"}
			lastModified={"JANUARY 19, 2026"}
			sections={cookiesContent}
		/>
	);
}
