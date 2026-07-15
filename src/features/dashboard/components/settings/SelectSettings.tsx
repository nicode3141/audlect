import React, { useEffect, useState } from "react";

import { useUpdateSettings } from "../../hooks/useDashboard";
import type { SettingsData } from "~/features/dashboard/hooks/useDashboard";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "~/shared/ui/select";
import { Separator } from "~/shared/ui/separator";
import { toast } from "sonner";

interface ComboSettingsProps {
	settings: SettingsData;
}

export default function ComboSettings({ settings }: ComboSettingsProps) {
	const setting = useUpdateSettings();

	const [songsPerUser, setSongsPerUser] = useState<number>(0);
	const [likesPerUser, setLikesPerUser] = useState<number>(0);
	const [maxVotesDel, setMaxVotesDel] = useState<number>(0);

	useEffect(() => {
		setSongsPerUser(settings?.max_songs_user ?? 0);
		setLikesPerUser(settings?.max_votes_user ?? 0);
		setMaxVotesDel(settings?.max_votes_del ?? 0);
	}, [settings?.max_songs_user, settings?.max_votes_user, settings?.max_votes_del]);

	function changeMaxSongs(limit: number) {
		if (settings?.voting_id === undefined) {
			toast.error("Something went wrong");
			return;
		}
		setting.mutate({ voting_id: settings.voting_id, max_songs_user: limit });
		setSongsPerUser(limit);
	}

	function changeMaxLikes(limit: number) {
		if (settings?.voting_id === undefined) {
			toast.error("Something went wrong");
			return;
		}
		setting.mutate({ voting_id: settings.voting_id, max_votes_user: limit });
		setLikesPerUser(limit);
	}

	function changeDelLikes(limit: number) {
		if (settings?.voting_id === undefined) {
			toast.error("Something went wrong");
			return;
		}
		setting.mutate({ voting_id: settings.voting_id, max_votes_del: limit });
		setMaxVotesDel(limit);
	}

	return (
		<div className="flex gap-4 flex-col">
			<ComboItem
				name={"Songs per participant"}
				value={songsPerUser}
				onChange={(value) => changeMaxSongs(parseInt(value))}
			/>
			<ComboItem
				name={"Likes per participant"}
				value={likesPerUser}
				onChange={(value) => changeMaxLikes(parseInt(value))}
			/>
			<ComboItem
				name={"Prevent deletion after"}
				value={maxVotesDel}
				onChange={(value) => changeDelLikes(parseInt(value))}
			/>
		</div>
	);
}

function ComboItem({ name, value, onChange }: { name: string; value: number; onChange: (input: string) => void }) {
	return (
		<div className="flex items-center gap-4 dark:text-white!">
			<div className="w-auto">{name}</div>
			<Select onValueChange={(value) => onChange(value)} value={value.toString()}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value={"0"}>off</SelectItem>
					</SelectGroup>
					<SelectGroup>
						<SelectLabel>
							<Separator />
						</SelectLabel>
						{Array.from({ length: 9 }).map((_, i) => (
							<SelectItem value={(i + 1).toString()} key={i}>
								{i + 1}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
