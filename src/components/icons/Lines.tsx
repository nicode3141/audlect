import React, { type SVGProps } from "react";

export function DividerLine(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 1" width="200" height="1" {...props}>
			<title>{"Rectangle 5"}</title>
			<path fill="currentColor" fillRule="evenodd" d={`M0 0h${props.width ?? "200"}v1H0z`} />
		</svg>
	);
}
