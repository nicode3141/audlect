'use client';

import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { DropdownIcon } from '~/components/icons/Arrows';
import { SortIcon } from '~/components/icons/Search';
import type { SortMethodsType } from '~/types/global';

interface SortMethodProps {
	className?: string;
	currentSort: SortMethodsType;
	sortOptions: Array<SortMethodsType>;
	onChange: (sortMethod: SortMethodsType) => void;
}

export default function SortMethods({
	className,
	currentSort,
	sortOptions,
	onChange,
}: SortMethodProps) {
	const [dropdownActive, setDropdownActive] = useState<boolean>();
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const closeDropdown = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setDropdownActive(false);
			}
		};
		document.body.addEventListener('mousedown', closeDropdown);
		return () => document.body.removeEventListener('mousedown', closeDropdown);
	}, []);

	return (
		<div className={`relative inline-block ${className}`} ref={dropdownRef}>
			<button
				className="flex cursor-pointer items-center gap-1 rounded-[0.5rem] bg-[#dfdfdf] p-2"
				onClick={() => setDropdownActive((prev) => !prev)}
			>
				<SortIcon />
				<span className="font-montserrat font-semibold text-[#848181]">
					{currentSort}
				</span>
				<DropdownIcon />
			</button>
			<div className="pt-3">
				<AnimatePresence>
					{dropdownActive && sortOptions && (
						<motion.ul
							initial="collapsed"
							animate="open"
							exit="collapsed"
							variants={{
								open: { opacity: 1, height: 'auto' },
								collapsed: { opacity: 0, height: 0 },
							}}
							transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
							className="absolute left-0 z-50 w-40 overflow-hidden rounded-lg bg-gray-100 shadow-lg"
						>
							{sortOptions
								.filter((sort) => sort !== currentSort)
								.map((item) => (
									<li
										key={item}
										className="font-montserrat cursor-pointer px-3 py-1 hover:px-4 hover:text-gray-600"
										onClick={() => {
											onChange(item);
											setDropdownActive(false);
											window.scrollTo(0, 0);
										}}
									>
										{item}
									</li>
								))}
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
