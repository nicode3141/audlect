"use client";

import React from "react";
import { authClient } from "~/lib/auth-client";
import { UserButton } from "./auth/user-button";
import { SignIn } from "./SignInBtn";
import SignInLink from "./SignInLink";
import { Loader2 } from "lucide-react";

export default function DynamicAuthBtn() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) return <SignInLink />;

	return session ? <UserButton size={"icon"} /> : <SignInLink />;
}
