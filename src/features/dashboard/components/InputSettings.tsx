import React, { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "~/shared/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "~/shared/ui/dialog";
import { Field } from "~/shared/ui/field";
import { Input } from "~/shared/ui/input";
import { Label } from "~/shared/ui/label";

interface ISettingsProps {
	currentValue: string;
	action: string;
	actionDesc: string;
	onChange: (title: string) => void;
	loading: boolean;
}

export default function InputSettings({ currentValue, action, actionDesc, onChange, loading }: ISettingsProps) {
	const [value, setValue] = useState<string>(currentValue);
	const [open, setOpen] = useState(false);
	const prevLoading = useRef(loading);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onChange(value);
	};

	const handleOpenChange = (open: boolean) => {
		if (open) {
			setValue(currentValue);
		}
		setOpen(open);
	};

	useEffect(() => {
		if (prevLoading.current && !loading) {
			setOpen(false);
		}
		prevLoading.current = loading;
	}, [loading]);

	return (
		<div className="flex gap-5 items-center px-1 py-1">
			{currentValue}
			<Dialog open={open} onOpenChange={handleOpenChange}>
				<DialogTrigger asChild>
					<Button className="p-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-lg font-medium px-4">
						{currentValue === "" ? "Add" : "Edit"}
					</Button>
				</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<DialogTitle>{action}</DialogTitle>
				<DialogDescription className="dark:text-neutral-200 font-montserrat">{actionDesc}</DialogDescription>

				<form onSubmit={handleSubmit} className="contents">
					<Field>
						<Label>Title</Label>
						<Input defaultValue={currentValue} onChange={(e) => setValue(e.target.value)} />
					</Field>
					{!loading ? (
						<Button type="submit" disabled={currentValue === value ? true : false}>
							Save
						</Button>
					) : (
						<Button type="submit" disabled>
							<Loader2 className="animate-spin" />
						</Button>
					)}
				</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
