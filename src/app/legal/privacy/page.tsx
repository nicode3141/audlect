import React from "react";
import LegalTemplate from "../LegalTemplate";
import { privacyContent } from "../[content]/privacy";

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
