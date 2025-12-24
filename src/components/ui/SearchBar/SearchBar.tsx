"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { CloseIcon, SearchIcon } from "~/components/icons/Search";
import { useDebounce } from "~/hooks/useDebounce";
import { useRequireLogin } from "~/hooks/useRequireLogin";

interface ISearchBarProps {
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	placeholder?: string;
	onSubmit: (value: string) => void;
	onClose?: () => void;
	lastSearch: string;
}

export default function SearchBar(props: ISearchBarProps) {
	const { inputProps, placeholder, onSubmit, onClose, lastSearch } = props;
	const [value, setValue] = useState("");
	const { requireLogin } = useRequireLogin();

	const { debounced: debouncedSearch, setDebounced: setDebouncedSearch } = useDebounce(value, 350);

	useEffect(() => {
		if (debouncedSearch === "") return;
		void requireLogin(() => {
			if (lastSearch === debouncedSearch) return;
			onSubmit(debouncedSearch);
		});
	}, [debouncedSearch, lastSearch, onSubmit, requireLogin]);

	const handleSearchReset = () => {
		setValue("");
		setDebouncedSearch("");
		onSubmit("");
		onClose?.();
	};

	const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			onSubmit(value);
			(e.target as HTMLInputElement).blur();
		}
	};

	return (
		<form
			className="flex w-[90vw] shrink-0 items-center gap-2 rounded-[25px] bg-[#E1E1E1] px-4 py-2 focus-within:outline-2 focus-within:outline-gray-400 md:w-2xl dark:bg-[#363636]"
			onSubmit={(e) => e.preventDefault()}
		>
			<SearchIcon className="h-6 w-6 shrink-0 text-gray-600 dark:text-gray-100" />
			<input
				className="min-w-0 flex-1 p-1 text-xl font-medium outline-0 placeholder:text-xl placeholder:font-normal dark:text-white dark:placeholder:text-gray-100"
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={(e) => requireLogin(() => setValue(e.target.value))}
				onKeyDown={handleSearchKeyDown}
				{...inputProps}
			/>
			{value && (
				<button className="shrink-0 cursor-pointer" aria-label="Close" onClick={() => handleSearchReset()}>
					<CloseIcon className="h-4 w-4 text-[#757575] dark:text-gray-100" />
				</button>
			)}
		</form>
	);
}
