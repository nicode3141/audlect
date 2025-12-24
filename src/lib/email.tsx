import type { User } from "~/types/auth/auth-client";
import { Resend } from "resend";
import { EmailTemplate } from "~/components/auth/email/email-template";
import type { ReactNode } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
	to,
	subject,
	text,
	username,
}: {
	to: string;
	subject: string;
	text: string;
	username: string;
}) {
	const name = username || to.split("@")[0];
	try {
		console.log("Sending email to:", to);

		const { error } = await resend.emails.send({
			from: "Audlect <accounting@nicodenetworks.com>",
			to: to,
			subject: subject,
			react: EmailTemplate({
				action: subject,
				content: (
					<>
						<p>
							Reset password for user <strong>{name}</strong>.
						</p>

						<p>{text}</p>
					</>
				) as ReactNode,
				heading: subject,
				siteName: "Audlect",
				baseUrl: "https://audlect.nicodenetworks.com",
			}),
		});

		if (error) {
			console.log(error);
		}
	} catch (error) {
		console.log("Error sending email:", error);
	}
}
