import { useRouter, usePathname } from "next/navigation";
import { Button } from "../../auth/ui/button";

export const SignIn = () => {
	const router = useRouter();

	const location = usePathname();

	const handleSignIn = async () => {
		router.push(`/auth/sign-in?redirectTo=${encodeURIComponent(location)}`);
	};

	return (
		<Button onClick={handleSignIn} type="submit" className="cursor-pointer">
			Sign in
		</Button>
	);
};
