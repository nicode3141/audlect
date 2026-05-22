import "~/styles/globals.css";
import { interFont, montserratFont } from "~/app/styles/fonts/font";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";

import "react-loading-skeleton/dist/skeleton.css";
import { AuthProvider } from "~/features/auth/AuthProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "Audlect - Vote Music",
	description: "Vote Music with your Friends, Guests and Artists",

	authors: [
		{
			name: "nicode3141",
			url: "https://github.com/nicode3141",
		},
	],
	keywords: [
		"music voting",
		"vote music app",
		"party playlist voting",
		"guest interactive music",
		"Audlect",
		"event engagement",
		"interactive playlist",
	],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<TRPCReactProvider>
			<html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
				<head>
					<link rel="manifest" href="/manifest.json" />
					<meta name="google-site-verification" content="yLjcVnpIMX5kpihar7L_mOImR_sVKCkDCK4uH0rV_hM" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="application-name" content="Audlect" />
					<meta name="apple-mobile-web-app-title" content="Audlect" />
					<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
					<meta property="og:image" content="<generated>" />
					<meta property="og:image:type" content="<generated>" />
					<meta property="og:image:width" content="<generated>" />
					<meta property="og:image:height" content="<generated>" />
					<meta name="twitter:image" content="<generated>" />
					<meta name="twitter:image:type" content="<generated>" />
					<meta name="twitter:image:width" content="<generated>" />
					<meta name="twitter:image:height" content="<generated>" />
					<script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
				</head>
				<body
					className={`${interFont.variable} ${montserratFont.variable} antialiase min-h-screen bg-white
						dark:bg-[#161616]`}
				>
					<Toaster position="top-center" richColors expand />
					<AuthProvider>{children}</AuthProvider>
				</body>
			</html>
		</TRPCReactProvider>
	);
}
