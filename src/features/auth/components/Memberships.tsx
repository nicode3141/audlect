"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "~/shared/ui/button";

export const Memberships = () => {
	const data = authClient.useSession();

	return <Button onClick={() => console.log("Auth Client Session Data:", data)}>Get Memberships</Button>;
};
