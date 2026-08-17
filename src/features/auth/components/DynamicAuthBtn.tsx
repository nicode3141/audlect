"use client";

import React from "react";
import { authClient } from "~/lib/auth-client";
import { UserButton } from "./auth/user-button";
import { SignIn } from "./SignInBtn";
import SignInLink from "./SignInLink";

export default function DynamicAuthBtn() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) return <div>Loading...</div>;

	return session ? <UserButton size={"icon"} /> : <SignInLink />;
}
