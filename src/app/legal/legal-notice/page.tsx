import React from "react";
import LegalTemplate from "../LegalTemplate";
import { legalNoticeContent } from "../[content]/legal-notice";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Legal Notice",
	robots: { index: false },
	alternates: {
		canonical: "https://audlect.nicodenetworks.com/",
	},
};

export default function page() {
	return (
		<LegalTemplate
			title={"Legal Notice"}
			website={"nicode networks - nicodenetworks.com"}
			lastModified={"AUGUST 24, 2026"}
			sections={legalNoticeContent}
		/>
	);
}
