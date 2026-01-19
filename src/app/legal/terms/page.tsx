import React from "react";
import LegalTemplate from "../LegalTemplate";
import { termsContent } from "../[content]/terms";

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
