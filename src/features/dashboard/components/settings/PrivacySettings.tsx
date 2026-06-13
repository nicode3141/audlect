import React, { useEffect, useState } from "react";
import { Checkbox } from "~/shared/ui/checkbox";
import { useUpdateSettings } from "../../hooks/useDashboard";
import type { SettingsData } from "~/features/dashboard/hooks/useDashboard";
import { toast } from "sonner";

interface PrivacySettingsProps {
	settings: SettingsData;
}

export default function PrivacySettings({ settings }: PrivacySettingsProps) {
	const setting = useUpdateSettings();

	const [isPrivate, setIsPrivate] = useState<boolean>(false);

	useEffect(() => {
		if (!settings) return;
		setIsPrivate(!settings.public);
	}, [settings]);

	function changeIsPrivate(state: boolean) {
		if (settings?.voting_id === undefined) {
			toast.error("Please slow down.");
			return;
		}
		setting.mutate({ voting_id: settings.voting_id, public: !state });
		setIsPrivate(state);
	}
	return (
		<div className="flex items-center gap-4 dark:text-white">
			Private
			<Checkbox checked={isPrivate} onCheckedChange={(checked) => changeIsPrivate(checked as boolean)} />
		</div>
	);
}
