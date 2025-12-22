import { authClient } from "@/lib/auth-client";

export const SingOut = () => {
	const handleSignOut = async () => {
		await authClient.signOut();
	};

	return (
		<button type="submit" onClick={handleSignOut}>
			Sign Out
		</button>
	);
};
