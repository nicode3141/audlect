import React from "react";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/shared/ui/combobox";

export default function ComboSettings() {
	const settings = [];

	return (
		<div className="flex gap-4 flex-col">
			<div className="flex items-center gap-4 dark:text-white!">
				<div className="w-auto">Songs per participant</div>
				<Combobox items={["off", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}>
					<ComboboxInput value={"off"} />
					<ComboboxContent>
						<ComboboxEmpty>No items found.</ComboboxEmpty>
						<ComboboxList>
							{(item) => (
								<ComboboxItem key={item as string} value={item as string}>
									{item}
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>
			</div>
			<div className="flex items-center gap-4 dark:text-white">
				<div className="w-auto">Songs per participant</div>
				<Combobox items={["off", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}>
					<ComboboxInput value={"off"} />
					<ComboboxContent>
						<ComboboxEmpty>No items found.</ComboboxEmpty>
						<ComboboxList>
							{(item) => (
								<ComboboxItem key={item as string} value={item as string}>
									{item}
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>
			</div>
			<div className="flex items-center gap-4 dark:text-white">
				<div className="w-auto">Songs per participant</div>
				<Combobox items={["off", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}>
					<ComboboxInput value={"off"} />
					<ComboboxContent>
						<ComboboxEmpty>No items found.</ComboboxEmpty>
						<ComboboxList>
							{(item) => (
								<ComboboxItem key={item as string} value={item as string}>
									{item}
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>
			</div>
		</div>
	);
}
