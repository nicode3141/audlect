import { authClient } from "@/lib/auth-client";

export const SignIn = () => {
	const handleSignIn = async () => {
		const { data, error } = await authClient.signIn.email({
			email: "user@example.com",
			password: "password",
			rememberMe: true,
		});

		if (error) {
			alert("Sign-in failed. Please check your credentials and try again.");
			console.error(error);
			return;
		}

		// Handle successful sign in
		console.log("Signed in:", data);
	};

	return (
		<button onClick={handleSignIn} type="submit">
			Sign in
		</button>
	);
};
