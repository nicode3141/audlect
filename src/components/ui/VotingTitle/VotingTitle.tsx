import React from "react";

interface VotingTitleProps {
	children?: React.ReactNode;
}

export function VotingTitle({ children }: VotingTitleProps) {
	return (
		<div className={`heading1 font-inter text-center text-4xl font-bold text-[#898989] lg:text-6xl dark:text-white`}>
			{children}
		</div>
	);
}

export function VotingSubitle({ children }: VotingTitleProps) {
	return (
		<div
			className={`heading2small font-inter text-center text-2xl font-medium text-[#B5B5B5] text-shadow-2xs lg:text-3xl dark:text-gray-300`}
		>
			{children}
		</div>
	);
}
