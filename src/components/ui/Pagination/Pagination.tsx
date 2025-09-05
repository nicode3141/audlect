import React from "react";
import { BackArrow, ForwardArrow } from "~/components/icons/Arrows";
import { usePagination } from "~/hooks/usePagination";
import { cva } from "class-variance-authority";
import { cn } from "~/lib/utils";
import PGNumber from "./PGNumber";

type PaginationVariant = "default" | "search_result";

const paginationVariants = cva(
	`flex items-center justify-center gap-4 px-3 py-2 bg-[#54B88636] rounded-[2.5rem] select-none`, //base css
	{
		variants: {
			variant: {
				default: `bg-[#54B88636]`,
				search_result: `bg-[#F0F0F0]`,
			},
		},
		defaultVariants: {
			variant: `default`,
		},
	},
);

interface PaginationProps {
	variant: PaginationVariant;
	totalPages: number;
	currentPage: number;
	gotoPage: (page: number) => void;
}

export default function Pagination({
	variant,
	totalPages,
	currentPage,
	gotoPage,
}: PaginationProps) {
	const centerPageElements = usePagination({ totalPages, currentPage });
	console.log({ centerPageElements });
	return (
		<div className={cn(paginationVariants({ variant }))}>
			<button
				className={`${currentPage === 1 ? "invert-50" : "cursor-pointer"}`}
				aria-label="back-button"
				onClick={() => currentPage > 1 && gotoPage(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<BackArrow />
			</button>
			<div className="flex items-center gap-2">
				{centerPageElements.map((page, index) =>
					page === "..." ? (
						<span key={index} className="font-montserrat text-xl font-semibold">
							...
						</span>
					) : (
						<PGNumber
							number={Number(page)}
							key={String(index)}
							isActive={page === currentPage}
							gotoPage={gotoPage}
						/>
					),
				)}
			</div>
			<button
				className={`${currentPage >= totalPages ? "invert-50" : "cursor-pointer"}`}
				aria-label="forward-button"
				onClick={() => currentPage < totalPages && gotoPage(currentPage + 1)}
				disabled={currentPage >= totalPages}
			>
				<ForwardArrow />
			</button>
		</div>
	);
}
