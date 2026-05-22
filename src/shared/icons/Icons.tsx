import React, { type SVGProps } from "react";

export function LinkIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8 0H18C19.1523 0 20 0.847715 20 2V12C20 13.1523 19.1523 14 18 14H14V18C14 19.1523 13.1523 20 12 20H2C0.847715 20 0 19.1523 0 18V8C0 6.84772 0.847715 6 2 6H6V2C6 0.847715 6.84772 0 8 0ZM6 8H2V18H12V14H8C6.84772 14 6 13.1523 6 12V8ZM8 2V12H18V2H8Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export function ReportIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={18} height={22} fill="none" {...props}>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M3 22H0v-2h1V0h2v1h14.125l-2.999 6 3 6H3v7h1v2H3Zm0-11V3h10.89l-2 4 2 4H3Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

export function DeleteIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M2.5 5h15M15.833 5v11.667a1.667 1.667 0 0 1-1.666 1.666H5.833a1.667 1.667 0 0 1-1.666-1.666V5m2.5 0V3.333a1.667 1.667 0 0 1 1.666-1.666h3.334a1.666 1.666 0 0 1 1.666 1.666V5M8.333 9.167v5M11.667 9.167v5"
			/>
		</svg>
	);
}
