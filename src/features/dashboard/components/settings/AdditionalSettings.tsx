import { HelpCircle } from "lucide-react";
import React from "react";
import { Checkbox } from "~/shared/ui/checkbox";

export default function AdditionalSettings() {
	return (
		<div className="flex gap-4 flex-col">
			<div className="flex items-center gap-4 dark:text-white">
				Song approval
				<Checkbox checked={true} />
				<HelpCircle size={17} className="text-neutral-300" />
			</div>
			<div className="flex items-center gap-4 dark:text-white">
				Filter inappropriate
				<Checkbox checked={true} />
				<HelpCircle size={17} className="text-neutral-300" />
			</div>
		</div>
	);
}
