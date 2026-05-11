import React from "react";
import CreateVoting from "~/components/layout/CreateVoting/CreateVoting";
import { LoginWarnProvider } from "~/context/LoginWarningContext";

export default function page() {
	return (
		<LoginWarnProvider>
			<CreateVoting />
		</LoginWarnProvider>
	);
}
