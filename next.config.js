/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import("next").NextConfig} */
const config = {
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
		],
	},
};

export default withSentryConfig(config, {
	org: "nicodenetworks",
	project: "javascript-nextjs",
	silent: !process.env.CI,
	widenClientFileUpload: true,
	// tunnelRoute: "/monitoring",
});
