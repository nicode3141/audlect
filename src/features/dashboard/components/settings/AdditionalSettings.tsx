import { HelpCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Checkbox } from "~/shared/ui/checkbox";
import { useUpdateSettings } from "~/features/dashboard/hooks/useDashboard";
import type { SettingsData } from "~/features/dashboard/hooks/useDashboard";
import { toast } from "sonner";

interface AdditionalSettingsProps {
	settings: SettingsData;
}

export default function AdditionalSettings({ settings }: AdditionalSettingsProps) {
	const setting = useUpdateSettings();

	const [hasSongApproval, setHasSongApproval] = useState<boolean>(false);
	const [hasFilter, setHasFilter] = useState<boolean>(false);

	useEffect(() => {
		setHasSongApproval(settings?.song_approval ?? false);
		setHasFilter(settings?.filter_inappropriate ?? false);
	}, [settings?.song_approval, settings?.filter_inappropriate]);

	function changeApproval(state: boolean) {
		if (settings?.voting_id === undefined) {
			toast.error("Please slow down.");
			return;
		}
		setting.mutate({ voting_id: settings.voting_id, song_approval: state });
		setHasSongApproval(state);
	}

	function changeFilter(state: boolean) {
		if (settings?.voting_id === undefined) {
			toast.error("Please slow down.");
			return;
		}
		console.log(state);
		setting.mutate({ voting_id: settings.voting_id, filter_inappropriate: state });
		setHasFilter(state);
	}

	return (
		<div className="flex gap-4 flex-col">
			<div className="flex items-center gap-4 dark:text-white">
				Song approval
				<Checkbox checked={hasSongApproval} onCheckedChange={(checked) => changeApproval(checked as boolean)} />
				<HelpCircle size={17} className="text-neutral-300" />
			</div>
			<div className="flex items-center gap-4 dark:text-white">
				Filter inappropriate
				<Checkbox checked={hasFilter} onCheckedChange={(checked) => changeFilter(checked as boolean)} />
				<HelpCircle size={17} className="text-neutral-300" />
			</div>
		</div>
	);
}
