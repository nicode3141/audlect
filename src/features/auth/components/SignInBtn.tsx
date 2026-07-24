"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "~/shared/ui/button";
import { cn } from "~/shared/utils/utils";

interface SignInProps {
	className?: string | undefined;
}

export function SignIn({ className }: SignInProps) {
	const router = useRouter();

	const location = usePathname();

	const handleSignIn = async () => {
		router.push(`/auth/sign-in?redirectTo=${encodeURIComponent(location)}`);
	};

	return (
		<Button onClick={handleSignIn} type="submit" className={cn("cursor-pointer", className)}>
			Sign in
		</Button>
	);
}
