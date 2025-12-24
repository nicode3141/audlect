import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, twoFactor, username } from "better-auth/plugins";
import { db } from "~/server/db";
import { sendEmail } from "./email";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg" }),
	user: {
		deleteUser: {
			enabled: true,
		},
	},
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			void sendEmail({
				to: user.email,
				subject: "Reset your password",
				text: `Click the link to reset your password: ${url}`,
			});
		},
		onPasswordReset: async ({ user }, request) => {
			// your logic here
			console.log(`Password for user ${user.email} has been reset.`);
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
		github: {
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		},
	},
	plugins: [admin(), twoFactor(), username()],
});
