"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../utils/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export type TimeFormat = "12h" | "24h";

export interface TimePickerProps {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	format?: TimeFormat;
	minuteStep?: number;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	id?: string;
	"aria-label"?: string;
}

function pad(n: number) {
	return n.toString().padStart(2, "0");
}

function parse24(value?: string): { h: number; m: number } | null {
	if (!value) return null;
	const match = /^(\d{1,2}):(\d{1,2})$/.exec(value.trim());
	if (!match) return null;
	const h = Number(match[1]);
	const m = Number(match[2]);
	if (h < 0 || h > 23 || m < 0 || m > 59) return null;
	return { h, m };
}

function parseFreeText(text: string, format: TimeFormat): { h: number; m: number } | null {
	const cleaned = text.trim().toLowerCase();
	if (!cleaned) return null;

	const period = cleaned.includes("am") ? "am" : cleaned.includes("pm") ? "pm" : null;
	const digits = cleaned.replace(/[^\d:.]/g, "").replace(".", ":");

	let h: number;
	let m: number;

	if (digits.includes(":")) {
		const [hh, mm] = digits.split(":");
		h = Number(hh);
		m = Number(mm ?? "0");
	} else if (digits.length <= 2) {
		h = Number(digits);
		m = 0;
	} else {
		h = Number(digits.slice(0, digits.length - 2));
		m = Number(digits.slice(-2));
	}

	if (Number.isNaN(h) || Number.isNaN(m) || m > 59 || m < 0) return null;

	if (format === "12h" || period) {
		if (h < 1 || h > 12) return null;
		if (period === "pm" && h !== 12) h += 12;
		if (period === "am" && h === 12) h = 0;
	} else {
		if (h < 0 || h > 23) return null;
	}

	return { h, m };
}

function to12(h: number): { hour12: number; period: "AM" | "PM" } {
	const period = h >= 12 ? "PM" : "AM";
	let hour12 = h % 12;
	if (hour12 === 0) hour12 = 12;
	return { hour12, period };
}

function from12(hour12: number, period: "AM" | "PM"): number {
	let h = hour12 % 12;
	if (period === "PM") h += 12;
	return h;
}

function formatDisplay(h: number, m: number, format: TimeFormat): string {
	if (format === "24h") return `${pad(h)}:${pad(m)}`;
	const { hour12, period } = to12(h);
	return `${pad(hour12)}:${pad(m)} ${period}`;
}

interface ColumnProps {
	label: string;
	values: number[] | ("AM" | "PM")[];
	selected: number | "AM" | "PM";
	onSelect: (value: number | "AM" | "PM") => void;
	formatValue?: (v: number | "AM" | "PM") => string;
}

function Column({ label, values, selected, onSelect, formatValue }: ColumnProps) {
	const itemRefs = React.useRef<Map<string | number, HTMLButtonElement | null>>(new Map());

	React.useEffect(() => {
		const el = itemRefs.current.get(selected);
		el?.scrollIntoView({ block: "center" });
	}, [selected]);

	return (
		<div className="flex flex-col">
			<div
				className="sticky top-0 z-10 bg-popover px-2 py-1.5 text-center text-xs font-medium text-muted-foreground
					border-b"
			>
				{label}
			</div>
			<ScrollArea className="h-56 w-16">
				<div role="listbox" aria-label={label} className="flex flex-col items-stretch p-1">
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
									isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
								)}
							>
								{text}
							</button>
						);
					})}
				</div>
			</ScrollArea>
		</div>
	);
}

export function TimeField({
	value,
	defaultValue,
	onChange,
	format = "24h",
	minuteStep = 1,
	placeholder,
	disabled,
	className,
	id,
	...aria
}: TimePickerProps) {
	const isControlled = value !== undefined;
	const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
	const committed = isControlled ? (value ?? "") : internalValue;

	const [open, setOpen] = React.useState(false);
	const [draft, setDraft] = React.useState<{ h: number; m: number }>(() => parse24(committed) ?? { h: 0, m: 0 });
	const [text, setText] = React.useState(() =>
		committed ? formatDisplay(parse24(committed)!.h, parse24(committed)!.m, format) : "",
	);

	// Keep the text input + draft in sync when the committed value changes externally.
	React.useEffect(() => {
		const parsed = parse24(committed);
		setDraft(parsed ?? { h: 0, m: 0 });
		setText(parsed ? formatDisplay(parsed.h, parsed.m, format) : "");
	}, [committed, format]);

	function commit(next: { h: number; m: number }) {
		const nextValue = `${pad(next.h)}:${pad(next.m)}`;
		if (!isControlled) setInternalValue(nextValue);
		setText(formatDisplay(next.h, next.m, format));
		onChange?.(nextValue);
	}

	function handleColumnHourSelect(v: number) {
		setDraft((d) => ({ ...d, h: v }));
	}

	function handleColumnHour12Select(hour12: number) {
		const { period } = to12(draft.h);
		setDraft((d) => ({ ...d, h: from12(hour12, period) }));
	}

	function handleMinuteSelect(v: number) {
		setDraft((d) => ({ ...d, m: v }));
	}

	function handlePeriodSelect(p: "AM" | "PM") {
		const { hour12 } = to12(draft.h);
		setDraft((d) => ({ ...d, h: from12(hour12, p) }));
	}

	function handleNow() {
		const now = new Date();
		const next = { h: now.getHours(), m: now.getMinutes() };
		setDraft(next);
		commit(next);
		setOpen(false);
	}

	function handleOk() {
		commit(draft);
		setOpen(false);
	}

	function handleInputBlur() {
		const parsed = parseFreeText(text, format);
		if (parsed) {
			setDraft(parsed);
			commit(parsed);
		} else {
			// Revert to last valid value.
			const fallback = parse24(committed);
			setText(fallback ? formatDisplay(fallback.h, fallback.m, format) : "");
		}
	}

	function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			e.preventDefault();
			handleInputBlur();
			setOpen(false);
		}
	}

	const hourValues =
		format === "24h" ? Array.from({ length: 24 }, (_, i) => i) : Array.from({ length: 12 }, (_, i) => i + 1);
	const minuteValues = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep);
	const { hour12, period } = to12(draft.h);
	const selectedHourColumnValue = format === "24h" ? draft.h : hour12;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<div className={cn("relative", className)}>
				<Input
					id={id}
					value={text}
					onChange={(e) => setText(e.target.value)}
					onBlur={handleInputBlur}
					onKeyDown={handleInputKeyDown}
					placeholder={placeholder ?? (format === "24h" ? "HH:mm" : "hh:mm aa")}
					disabled={disabled}
					aria-label={aria["aria-label"] ?? "Time"}
					className="pr-9"
				/>
				<PopoverTrigger asChild>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						disabled={disabled}
						className="absolute right-0 top-0 h-full w-9 text-muted-foreground hover:text-foreground"
						aria-label="Open time picker"
					>
						<Clock className="h-4 w-4" />
					</Button>
				</PopoverTrigger>
			</div>

			<PopoverContent align="start" className="w-auto p-0">
				<div className="flex divide-x">
					<Column
						label="Hours"
						values={hourValues}
						selected={selectedHourColumnValue}
						onSelect={(v) =>
							format === "24h" ? handleColumnHourSelect(v as number) : handleColumnHour12Select(v as number)
						}
					/>
					<Column
						label="Minutes"
						values={minuteValues}
						selected={draft.m}
						onSelect={(v) => handleMinuteSelect(v as number)}
					/>
					{format === "12h" && (
						<Column
							label=""
							values={["AM", "PM"]}
							selected={period}
							onSelect={(v) => handlePeriodSelect(v as "AM" | "PM")}
							formatValue={(v) => v as string}
						/>
					)}
				</div>
				<div className="flex items-center justify-between border-t p-2">
					<Button type="button" variant="link" size="sm" onClick={handleNow} className="px-2">
						Now
					</Button>
					<Button type="button" size="sm" onClick={handleOk}>
						OK
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
