import React from "react";
import LegalTemplate from "../LegalTemplate";
import { termsContent } from "../[content]/terms";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms and Conditions",
	description: "Terms and conditions for using the Audlect music voting platform.",
	robots: { index: true },
	alternates: {
		canonical: "https://audlect.nicodenetworks.com/legal/terms",
	},
};

export default function page() {
	return (
		<LegalTemplate
			title={"Terms and Conditions"}
			website={"nicode networks - nicodenetworks.com"}
			lastModified={"JANUARY 19, 2026"}
			sections={termsContent}
		/>
	);
}
