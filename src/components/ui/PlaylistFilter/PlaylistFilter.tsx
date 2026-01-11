"use client";

import { ChartColumnIncreasing } from "lucide-react";
import React from "react";
import { nop } from "~/lib/utils";
import type { SortMethodsType } from "~/types/global";

interface SortMethodProps {
	className?: string;
	onChange: (sortMethod: SortMethodsType) => void;
}

export default function PlaylistFilter({ className, onChange }: SortMethodProps) {
	return (
		<div className={`relative inline-block ${className}`}>
			<button
				className="group flex cursor-pointer items-center gap-1 rounded-[0.5rem] border-3 border-[#595959] px-2 py-1.25 transition duration-150 hover:bg-[#272727] hover:text-white"
				onClick={() => onChange()}
			>
				<ChartColumnIncreasing
					size={20}
					className="text-[#575757] transition duration-150 group-hover:text-white"
					strokeWidth={2.5}
				/>
				<span className="font-montserrat font-bold text-[#4f4f4f] transition duration-150 group-hover:text-white dark:text-gray-100">
					Ranking
				</span>
			</button>
			<div className="pt-3"></div>
		</div>
	);
}
