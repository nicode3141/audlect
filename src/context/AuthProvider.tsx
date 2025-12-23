"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { authClient } from "@/lib/auth-client";
import { AuthUIProvider } from "~/lib/auth/auth-ui-provider";

export function AuthProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	return (
		<AuthUIProvider
			authClient={authClient}
			navigate={(url) => {
				if (url.startsWith("/voting/")) {
					window.location.href = url;
				} else {
					router.push(url);
				}
			}}
			replace={(url) => {
				if (url.startsWith("/voting/")) {
					window.location.replace(url);
				} else {
					router.replace(url);
				}
			}}
			onSessionChange={() => {
				// Clear router cache (protected routes)
				router.refresh();
			}}
			Link={Link}
		>
			{children}
		</AuthUIProvider>
	);
}
