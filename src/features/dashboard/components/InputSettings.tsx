import React, { useState } from "react";
import { Button } from "~/shared/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "~/shared/ui/dialog";
import { Field } from "~/shared/ui/field";
import { Input } from "~/shared/ui/input";
import { Label } from "~/shared/ui/label";
import { Spinner } from "~/shared/ui/spinner";

interface ISettingsProps {
	currentValue: string;
	action: string;
	actionDesc: string;
	onChange: (title: string) => void;
	loading: boolean;
}

export default function InputSettings({ currentValue, action, actionDesc, onChange, loading }: ISettingsProps) {
	const [value, setValue] = useState<string>(currentValue);

	const handleSubmit = () => {
		onChange(value);
	};

	return (
		<div className="flex gap-5 items-center px-1 py-1">
			{currentValue}
			<Dialog>
				<DialogTrigger asChild>
					<Button className="p-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-lg font-medium px-4">
						{currentValue === "" ? "Add" : "Edit"}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-sm">
					<DialogTitle>{action}</DialogTitle>
					<DialogDescription className="dark:text-neutral-200 font-montserrat">{actionDesc}</DialogDescription>
					<Field>
						<Label>Title</Label>
						<Input
							defaultValue={currentValue}
							onChange={(e) => setValue(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter" && currentValue !== value) {
									handleSubmit();
								}
							}}
						/>
					</Field>
					{!loading ? (
						<Button type="submit" onClick={handleSubmit} disabled={currentValue === value ? true : false}>
							Save
						</Button>
					) : (
						<Button type="submit">
							<Spinner />
						</Button>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
