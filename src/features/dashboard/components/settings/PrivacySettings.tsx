import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Checkbox } from "~/shared/ui/checkbox";
import { useSettings, useUpdateSettings } from "../../hooks/useDashboard";
import { toast } from "sonner";

export default function PrivacySettings() {
	const { votingId } = useParams<{ votingId: string }>();
	const { data: settings } = useSettings(votingId);
	const setting = useUpdateSettings();

	const [isPrivate, setIsPrivate] = useState<boolean>(false);

	useEffect(() => {
		setIsPrivate(!settings?.public);
	}, [settings?.public]);

	function changeIsPrivate(state: boolean) {
		if (settings?.voting_id === undefined) {
			toast.error("Please slow down.");
			return;
		}
		setting.mutate({ voting_id: settings?.voting_id, public: !state });
		setIsPrivate(state);
	}
	return (
		<div className="flex items-center gap-4 dark:text-white">
			Private
			<Checkbox checked={isPrivate} onCheckedChange={(checked) => changeIsPrivate(checked as boolean)} />
		</div>
	);
}
