import React from "react";
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
	onChange: () => void;
	loading: boolean;
}

export default function InputSettings({ currentValue, action, actionDesc, onChange, loading }: ISettingsProps) {
	return (
		<div className="flex gap-5 items-center px-1 py-1">
			{currentValue}
			<Dialog>
				<DialogTrigger asChild>
					<Button className="p-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-lg font-medium px-4">Edit</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-sm">
					<DialogTitle>{action}</DialogTitle>
					<DialogDescription className="dark:text-neutral-200 font-montserrat">{actionDesc}</DialogDescription>
					<Field>
						<Label>Title</Label>
						<Input defaultValue={currentValue} />
					</Field>
					{!loading ? (
						<Button type="submit">Save</Button>
					) : (
						<Button type="submit" disabled>
							<Spinner />
						</Button>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
