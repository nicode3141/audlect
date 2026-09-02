"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "~/shared/ui/button";
import { cn } from "~/shared/utils/utils";

interface SignInProps {
	className?: string | undefined;
}

export default function SignInLink({ className }: SignInProps) {
	const router = useRouter();

	const location = usePathname();

	const handleSignIn = async () => {
		router.push(`/auth/sign-in?redirectTo=${encodeURIComponent(location)}`);
	};

	return (
		<button
			onClick={handleSignIn}
			type="submit"
			className={cn(
				`cursor-pointer text-left underline hover:text-shadow-sm hover:font-semibold duration-150 ease-in-out transition
				font-semibold`,
				className,
			)}
		>
			Sign in
		</button>
	);
}
