import React from "react";

interface PGNumberProps {
	number: number;
	isActive: boolean;
	gotoPage: (page: number) => void;
}

export default function PGNumber({ number, isActive, gotoPage }: PGNumberProps) {
	return (
		<button
			className={`${isActive ? "text-[#0DA955]" : "text-gray-900 dark:text-gray-300"} font-montserrat cursor-pointer text-3xl font-semibold`}
			onClick={() => gotoPage(number)}
		>
			{number}
		</button>
	);
}
