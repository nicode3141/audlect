import React from "react";
import { Checkbox } from "../ui/checkbox";
import TimePicker from "./TimePicker";
import { cn } from "../utils/utils";

interface IProps {
	title: string;
	className?: string | undefined;
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
}

export default function OptionalTime({ title, className, date, setDate }: IProps) {
	return (
		<div className={cn("flex flex-col gap-4 dark:text-white", className)}>
			<div className="font-montserrat flex items-center gap-4 font-semibold">
				{title}
				<Checkbox
					checked={date !== undefined}
					onCheckedChange={() => (date !== undefined ? setDate(undefined) : setDate(new Date()))}
				/>
			</div>
			{date !== undefined && <TimePicker date={date} setDate={setDate} />}
		</div>
	);
}
