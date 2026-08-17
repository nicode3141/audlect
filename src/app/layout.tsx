import "~/styles/globals.css";
import { interFont, montserratFont, nunitoFont } from "~/app/styles/fonts/font";
import { type Metadata, type Viewport } from "next";
import { TRPCReactProvider } from "~/trpc/react";

import "react-loading-skeleton/dist/skeleton.css";
import { AuthProvider } from "~/features/auth/AuthProvider";
import { Toaster } from "~/shared/ui/sonner";

const baseUrl = "https://audlect.nicodenetworks.com";

export const metadata: Metadata = {
	title: {
		default: "Audlect — Music Voting App | Vote Music Together",
		template: "%s | Audlect",
	},
	description:
		"Collaborative music voting for events, parties, and venues. Let your guests vote songs into a shared playlist in real time.",
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
	alternates: {
		canonical: baseUrl,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: baseUrl,
		siteName: "Audlect",
		title: "Audlect — Music Voting App | Vote Music Together",
		description:
			"Collaborative music voting for events, parties, and venues. Let your guests vote songs into a shared playlist in real time.",
		images: [
			{
				url: "/images/landing/hero-video-frame.png",
				width: 1200,
				height: 630,
				alt: "Audlect — collaborative music voting platform",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Audlect — Music Voting App | Vote Music Together",
		description:
			"Collaborative music voting for events, parties, and venues. Let your guests vote songs into a shared playlist in real time.",
		images: ["/images/landing/hero-video-frame.png"],
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
			<head>
				<link rel="manifest" href="/manifest.json" />
				<meta name="google-site-verification" content="yLjcVnpIMX5kpihar7L_mOImR_sVKCkDCK4uH0rV_hM" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="application-name" content="Audlect" />
				<meta name="apple-mobile-web-app-title" content="Audlect" />
				<link rel="apple-touch-icon" href="/apple-icon-180.png" />
				<script async src="https://scripts.simpleanalyticscdn.com/latest.js" />
			</head>
			<body
				className={`${interFont.variable} ${montserratFont.variable} ${nunitoFont.variable} antialiase min-h-screen
					bg-white font-inter dark:bg-[#161616] selection:bg-company selection:text-white`}
			>
				<TRPCReactProvider>
					<Toaster position="top-center" richColors expand />
					<AuthProvider>{children}</AuthProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
