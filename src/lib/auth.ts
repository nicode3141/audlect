import { betterAuth, type Session } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, customSession, twoFactor, username } from "better-auth/plugins";
import { db } from "~/server/db";
import { sendEmail } from "./email";
import { voting_membershipsTable } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { Memberships } from "~/components/ui/AuthManagement/Memberships";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg" }),
	trustedOrigins: ["http://localhost:3000", "http://192.168.1.240:3000"],
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
				username: user?.name,
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
			const memberships = await db
				.select()
				.from(voting_membershipsTable)
				.where(eq(voting_membershipsTable.user_id, user.id));

			return {
				user: {
					...user,
					votingMemberships: memberships.map((i) => ({
						votingId: i.voting_id,
						role: i.role,
					})),
				},
				session,
			};
		}),
	],
});
