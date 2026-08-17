import React from "react";
import LegalTemplate from "../LegalTemplate";
import { privacyContent } from "../[content]/privacy";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: "How Audlect collects, uses, and protects your personal data.",
	robots: { index: true },
	alternates: {
		canonical: "https://audlect.nicodenetworks.com/legal/privacy",
	},
};

export default function page() {
	return (
		<LegalTemplate
			title={"Privacy Policy"}
			website={"nicode networks - nicodenetworks.com"}
			lastModified={"JANUARY 19, 2026"}
			sections={privacyContent}
		/>
	);
}
