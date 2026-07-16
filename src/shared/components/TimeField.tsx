"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "../utils/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TimeColumn } from "./TimeColumn";
import { type TimeFormat, type Time, parse24, parseFreeText, to12, from12, formatTime } from "../utils/time-utils";

export type { TimeFormat };

export interface TimeFieldProps {
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

function hourValues(format: TimeFormat): number[] {
	return format === "24h" ? Array.from({ length: 24 }, (_, i) => i) : Array.from({ length: 12 }, (_, i) => i + 1);
}

function minuteValues(step: number): number[] {
	return Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);
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
}: TimeFieldProps) {
	const isControlled = value !== undefined;
	const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
	const committed = isControlled ? (value ?? "") : internalValue;

	const [open, setOpen] = React.useState(false);
	const [draft, setDraft] = React.useState<Time>(() => parse24(committed) ?? { h: 0, m: 0 });
	const [text, setText] = React.useState(() =>
		committed ? formatTime(parse24(committed)!.h, parse24(committed)!.m, format) : "",
	);

	React.useEffect(() => {
		const parsed = parse24(committed);
		setDraft(parsed ?? { h: 0, m: 0 });
		setText(parsed ? formatTime(parsed.h, parsed.m, format) : "");
	}, [committed, format]);

	function commit(next: Time) {
		const nextValue = `${String(next.h).padStart(2, "0")}:${String(next.m).padStart(2, "0")}`;
		if (!isControlled) setInternalValue(nextValue);
		setText(formatTime(next.h, next.m, format));
		onChange?.(nextValue);
	}

	function handleHourSelect(v: number) {
		if (format === "24h") {
			setDraft((d) => ({ ...d, h: v }));
		} else {
			const { period } = to12(draft.h);
			setDraft((d) => ({ ...d, h: from12(v, period) }));
		}
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
			const fallback = parse24(committed);
			setText(fallback ? formatTime(fallback.h, fallback.m, format) : "");
		}
	}

	function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			e.preventDefault();
			handleInputBlur();
			setOpen(false);
		}
	}

	const { hour12, period } = to12(draft.h);
	const selectedHour = format === "24h" ? draft.h : hour12;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<div className={cn("relative", className)}>
				<PopoverTrigger>
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

			<PopoverContent align="start" className="w-auto p-0 overflow-hidden dark:bg-neutral-700 dark:text-white">
				<div className="flex divide-x border-b bg-muted/4 dark:bg-neutral-500">
					<div className="w-16 px-2 py-1.5 text-center text-xs font-medium text-muted-foreground dark:text-white">
						Hours
					</div>
					<div className="w-16 px-2 py-1.5 text-center text-xs font-medium text-muted-foreground dark:text-white">
						Minutes
					</div>
					{format === "12h" && <div className="w-16 px-2 py-1.5" />}
				</div>
				<div className="flex divide-x">
					<TimeColumn
						values={hourValues(format)}
						selected={selectedHour}
						onSelect={(v) => handleHourSelect(v as number)}
					/>
					<TimeColumn
						values={minuteValues(minuteStep)}
						selected={draft.m}
						onSelect={(v) => handleMinuteSelect(v as number)}
					/>
					{format === "12h" && (
						<TimeColumn
							values={["AM", "PM"]}
							selected={period}
							onSelect={(v) => handlePeriodSelect(v as "AM" | "PM")}
							formatValue={(v) => v as string}
						/>
					)}
				</div>
				<div className="flex items-center justify-between border-t p-2 dark:text-white">
					<Button type="button" variant="link" size="sm" onClick={handleNow} className="px-2 dark:text-white">
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
