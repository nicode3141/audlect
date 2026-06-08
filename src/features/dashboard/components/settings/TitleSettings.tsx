import { useEffect, useState } from "react";
import InputSettings from "../InputSettings";
import { useParams } from "next/navigation";
import { useSettings, useUpdateSettings } from "~/features/dashboard/hooks/useDashboard";
import { toast } from "sonner";

export default function TitleSettings() {
	const { votingId } = useParams<{ votingId: string }>();
	const { data: settings } = useSettings(votingId);
	const setting = useUpdateSettings();

	const [votingTitle, setVotingTitle] = useState<string>("Loading");
	const [votingDesc, setVotingDesc] = useState<string>("Loading");

	useEffect(() => {
		setVotingTitle(settings?.name ?? "Couldn't get Title");
		setVotingDesc(settings?.description ?? "Couldn't get Description");
	}, [settings?.description, settings?.name]);

	function updateTitle(title: string) {
		if (settings?.voting_id === undefined) {
			toast.error("Please slow down.");
			return;
		}
		if (title === null || title.length === 0) {
			toast.error("Invalid title");
			return;
		}
		setting.mutate({ voting_id: settings?.voting_id, name: title });
		setVotingTitle(title);
	}

	function updateDesc(desc: string) {
		if (settings?.voting_id === undefined) {
			toast.error("Please slow down.");
			return;
		}
		if (desc === null || desc.length === 0) {
			toast.error("Invalid description");
			return;
		}
		setting.mutate({ voting_id: settings?.voting_id, description: desc });
		setVotingDesc(desc);
	}

	return (
		<>
			<div className="dark:text-white">
				<div className="font-semibold">Voting Title</div>
				<InputSettings
					currentValue={votingTitle}
					action={"Change Title"}
					actionDesc={"Customize the name of your voting!"}
					onChange={updateTitle}
					loading={false}
				/>
			</div>
			<div className="dark:text-white">
				<div className="font-semibold">Voting Description</div>
				<InputSettings
					currentValue={votingDesc}
					action={"Change Description"}
					actionDesc={"Customize the description of your voting!"}
					onChange={updateDesc}
					loading={false}
				/>
			</div>
		</>
	);
}
