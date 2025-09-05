import React from "react";

interface PGNumberProps {
	number: number;
	isActive: boolean;
	gotoPage: (page: number) => void;
}

export default function PGNumber({
	number,
	isActive,
	gotoPage,
}: PGNumberProps) {
	return (
		<button
			className={`${isActive ? "text-[#0DA955]" : "text-gray-900"} font-montserrat cursor-pointer text-xl font-semibold`}
			onClick={() => gotoPage(number)}
		>
			{number}
		</button>
	);
}
