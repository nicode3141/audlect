"use client";

import * as React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../utils/utils";
import { pad } from "../utils/time-utils";

export type ColumnValue = number | "AM" | "PM";

export interface TimeColumnProps {
	values: ColumnValue[];
	selected: ColumnValue;
	onSelect: (value: ColumnValue) => void;
	formatValue?: (v: ColumnValue) => string;
}

export function TimeColumn({ values, selected, onSelect, formatValue }: TimeColumnProps) {
	const itemRefs = React.useRef<Map<ColumnValue, HTMLButtonElement | null>>(new Map());

	React.useEffect(() => {
		const el = itemRefs.current.get(selected);
		el?.scrollIntoView({ block: "center" });
	}, [selected]);

	return (
		<ScrollArea className="h-56 w-16">
			<div role="listbox" className="flex flex-col items-stretch p-1">
				{values.map((v) => {
					const isSelected = v === selected;
					const text = formatValue ? formatValue(v) : pad(v as number);
					return (
						<button
							key={v}
							type="button"
							ref={(el) => {
								itemRefs.current.set(v, el);
							}}
							role="option"
							aria-selected={isSelected}
							onClick={() => onSelect(v)}
							className={cn(
								"shrink-0 rounded-md px-3 py-1.5 text-sm tabular-nums text-center transition-colors",
								"hover:bg-accent hover:text-accent-foreground",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								isSelected &&
									`bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground
									dark:bg-neutral-950`,
							)}
						>
							{text}
						</button>
					);
				})}
			</div>
		</ScrollArea>
	);
}
