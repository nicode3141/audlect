import React from "react";

interface IPlayIconProps {
	className?: string;
	type?: "play" | "pause" | "loading";
}

export default function PlayIcon(props: IPlayIconProps) {
	const { className, type } = props;

	switch (type) {
		case "loading":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="150%"
					height="150%"
					viewBox="0 0 50 50"
					fill="none"
					className={`${className} ${!className?.includes("h-") && "h-12 w-12"} animate-spin`}
				>
					<path
						fill="#C7C7C7"
						fillOpacity={0.3}
						d="M40 25c0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15v10C11.193 50 0 38.807 0 25S11.193 0 25 0s25 11.193 25 25-11.193 25-25 25V40c8.284 0 15-6.716 15-15Z"
					/>
					<path
						fill="#FFFFFFBB"
						d="M19.551.6a25 25 0 0 1 27.714 35.77 4 4 0 0 1-5.38 1.742l-1.693-.863a4 4 0 0 1-1.743-5.382 15.101 15.101 0 0 0-16.74-21.604 4.002 4.002 0 0 1-4.776-3.033l-.414-1.853A4.002 4.002 0 0 1 19.55.601Z"
					/>
				</svg>
			);
		case "pause":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="49"
					height="52"
					viewBox="0 0 49 52"
					fill="none"
					className={className}
				>
					<rect width="18" height="52" rx="5" fill="#FFFFFFBB" />
					<rect x="31" width="18" height="52" rx="5" fill="#FFFFFFBB" />
				</svg>
			);
		default:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="34"
					height="47"
					viewBox="0 0 34 47"
					fill="none"
					className={className}
				>
					<path
						d="M32.2263 22.0551C33.3414 22.8529 33.3414 24.5106 32.2263 25.3083L3.16369 46.1001C1.8401 47.047 0 46.1009 0 44.4735V2.88995C0 1.26252 1.8401 0.316433 3.16369 1.26334L32.2263 22.0551Z"
						fill="#FFFFFFBB"
					/>
				</svg>
			);
	}
}
