import { authClient } from "@/lib/auth-client";

export const SignUp = () => {
	const handleSignUp = async () => {
		const { data, error } = await authClient.signUp.email(
			{
				email: "user@example.com",
				password: "password",
				name: "User Name",
			},
			{
				onSuccess: (ctx) => {
					alert("Sign-up successful! Please check your email to verify your account.");
				},
			},
		);

		if (error) {
			console.error(error);
			return;
		}
		// Handle successful sign in
	};

	return (
		<button onClick={handleSignUp} type="submit">
			Sign up
		</button>
	);
};
