"use client";

import { UserStar, ArrowDownAZ, CalendarArrowUpIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "~/shared/hooks/useDebounce";
import { SearchIcon } from "~/shared/icons/Search";
import OptionBtn from "~/shared/ui/OptionBtn";

interface BrowseSearchProps {
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	onSubmit: (value: string) => void;
	onClose?: () => void;
	lastSearch: string;
}

export default function BrowseSearch(props: BrowseSearchProps) {
	const { inputProps, onSubmit, onClose, lastSearch } = props;
	const [value, setValue] = useState("");

	const { debounced: debouncedSearch, setDebounced: setDebouncedSearch } = useDebounce(value, 350);

	useEffect(() => {
		if (debouncedSearch === "") return;
		if (lastSearch === debouncedSearch) return;
		onSubmit(debouncedSearch);
	}, [debouncedSearch, lastSearch, onSubmit]);

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
		<div className="py-5 flex flex-col gap-3 max-w-[90vw]">
			<form
				className="flex w-[90vw] shrink-0 items-center gap-2 rounded-2xl bg-[#EAECF7] px-5 py-2 focus-within:outline-2
					focus-within:outline-company/50 md:w-2xl dark:bg-[#363636] focus-within:shadow"
				onSubmit={(e) => e.preventDefault()}
			>
				<SearchIcon className="h-6 w-6 shrink-0 text-black dark:text-gray-100" />
				<input
					className="min-w-0 flex-1 p-1 text-xl font-medium outline-0 placeholder:text-xl placeholder:font-normal
						dark:text-white dark:placeholder:text-gray-100"
					type="text"
					placeholder={"Search"}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</form>
			<div className="flex px-2 gap-2 text-nowrap overflow-scroll scrollbar-none">
				<OptionBtn variant={"selected"}>
					<UserStar /> Popular
				</OptionBtn>
				<OptionBtn variant={"disabled"}>
					<ArrowDownAZ /> A-Z
				</OptionBtn>
				<OptionBtn variant={"disabled"}>
					<CalendarArrowUpIcon /> Newest
				</OptionBtn>
			</div>
		</div>
	);
}
