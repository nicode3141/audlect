import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/shared/ui/button";
import { Calendar } from "~/shared/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "~/shared/ui/field";
import { Input } from "~/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/popover";

interface TimePickerProps {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
}

export default function TimePicker({ date, setDate }: TimePickerProps) {
	const [open, setOpen] = useState(false);

	return (
		<FieldGroup className="mx-auto max-w-xs flex-row sm:mx-10">
			<Field>
				<FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button variant="outline" id="date-picker-optional" className="w-32 justify-between font-normal">
							{date ? format(date, "PPP") : "Select date"}
							<ChevronDownIcon data-icon="inline-end" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="start">
						<Calendar
							mode="single"
							selected={date}
							captionLayout="dropdown"
							defaultMonth={date}
							onSelect={(date) => {
								setDate(date);
								setOpen(false);
							}}
						/>
					</PopoverContent>
				</Popover>
			</Field>
			<Field className="w-32">
				<FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
				<Input
					type="time"
					id="time-picker-optional"
					step="1"
					defaultValue="10:30:00"
					className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden
						[&::-webkit-calendar-picker-indicator]:appearance-none"
				/>
			</Field>
		</FieldGroup>
	);
}
