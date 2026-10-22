/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import path from "node:path";
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import("next").NextConfig} */
const config = {
	outputFileTracingRoot: path.join(import.meta.dirname),
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api.deezer.com",
				pathname: "/album/**",
			},
			{
				protocol: "https",
				hostname: "cdn-images.dzcdn.net",
				pathname: "/images/cover/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "www.gravatar.com",
			},
			{
				protocol: "https",
				hostname: "gravatar.com",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
				],
			},
		];
	},
};

export default withSentryConfig(config, {
	org: "nicodenetworks",
	project: "javascript-nextjs",
	silent: !process.env.CI,
	widenClientFileUpload: true,
	// tunnelRoute: "/monitoring",
});
