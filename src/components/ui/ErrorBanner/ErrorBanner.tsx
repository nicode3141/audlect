import React from "react";

export default function ErrorBanner() {
	return (
		<div className="font-inter flex flex-col items-center justify-center text-center font-semibold text-balance">
			<span className="text-xl text-[#C04848]">Something went wrong, try reloading your page...</span>
			<span className="max-w-[80vw] text-sm text-gray-700">
				If this error persists, contact info@nicodenetworks.com
			</span>
		</div>
	);
}
