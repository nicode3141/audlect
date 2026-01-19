import React from "react";
import LegalTemplate from "../LegalTemplate";
import { cookiesContent } from "../[content]/cookies";

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
