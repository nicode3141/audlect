"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function VotingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <ClerkProvider>{children}</ClerkProvider>;
}
