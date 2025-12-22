import { useRouter, usePathname } from "next/navigation";

export const SignIn = () => {
	const router = useRouter();

	const location = usePathname();

	const handleSignIn = async () => {
		router.push(`/auth/sign-in?redirectTo=${encodeURIComponent(location)}`);
	};

	return (
		<button onClick={handleSignIn} type="submit" className="cursor-pointer">
			Sign in
		</button>
	);
};
