import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, customSession, twoFactor, username } from "better-auth/plugins";
import { db } from "~/server/db";
import { sendEmail } from "./email";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg" }),
	trustedOrigins: [
		"http://localhost:3000",
		"http://192.168.1.*:3000",
		"https://audlect-*-nicode3141s-projects.vercel.app",
	],
	user: {
		deleteUser: {
			enabled: true,
		},
	},
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url, token: _token }, _request) => {
			void sendEmail({
				to: user.email,
				subject: "Reset your password",
				text: `Click the link to reset your password: ${url}`,
				username: user?.name,
			});
		},
		onPasswordReset: async ({ user }, _request) => {
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
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // 5 minutes
		},
	},
	plugins: [
		admin(),
		twoFactor(),
		username(),
		customSession(async ({ user, session }) => {
			return {
				user,
				session,
			};
		}),
	],
});
