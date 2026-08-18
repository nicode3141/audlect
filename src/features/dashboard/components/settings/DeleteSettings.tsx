import React, { useState } from "react";

import type { SettingsData } from "~/features/dashboard/hooks/useDashboard";
import { Button } from "~/shared/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "~/shared/ui/alert-dialog";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteSettingsProps {
	settings: SettingsData;
}

export default function DeleteSettings({ settings }: DeleteSettingsProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const deleteMutiation = api.votings.deleteVoting.useMutation({
		onMutate: () => {
			setLoading(true);
		},
		onError: (err) => {
			setLoading(false);
			toast.error("Couldn't delete your voting " + err.message);
		},
		onSuccess: (data) => {
			setLoading(false);

			if (!data) {
				toast.error("Something went wrong!");
				return;
			}

			toast.success("Deleted " + data?.name);
			setTimeout(() => router.push("/dashboard/"), 100);
		},
	});

	function deleteVoting() {
		if (settings?.voting_id === undefined) {
			toast.error("Something went wrong");
			return;
		}

		deleteMutiation.mutate({ voting_id: settings?.voting_id });
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant={"destructive"} disabled={loading}>
					{loading ? <Loader2 className="animate-spin" /> : "Delete Voting"}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="border-destructive/50 border-2">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-danger">Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your voting from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction variant={"destructive"} onClick={() => deleteVoting()}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
