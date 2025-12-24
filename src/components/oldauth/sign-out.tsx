import { authClient } from "@/lib/auth-client";

export const SingOut = () => {
	const { refetch } = authClient.useSession();

	const handleSignOut = async () => {
		await authClient.signOut();

		window.location.reload();
	};

	return (
		<button type="submit" onClick={handleSignOut} className="cursor-pointer">
			Sign Out
		</button>
	);
};
