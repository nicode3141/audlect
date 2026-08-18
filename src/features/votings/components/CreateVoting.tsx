"use client";

import { Lock, Plus } from "lucide-react";
import React, { useState } from "react";
import { Checkbox } from "~/shared/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/shared/ui/field";
import { Input } from "~/shared/ui/input";
import { Separator } from "~/shared/ui/separator";
import NotLoggedIn from "~/features/votings/components/NotLoggedIn";
import { useRequireLogin } from "~/shared/hooks/useRequireLogin";
import { api } from "~/trpc/react";
import TimePicker from "~/shared/components/TimePicker";
import PlayIcon from "~/shared/icons/PlayIcon";
import { toast } from "sonner";
import ShareVotingDialog from "./ShareVotingDialog";
import OptionalTime from "~/shared/components/OptionalTime";

export default function CreateVoting({ initialName }: { initialName?: string }) {
	const utils = api.useUtils();
	const { requireLogin } = useRequireLogin();

	const [votingName, setVotingName] = useState(initialName ?? "");
	const [votingDescription, setVotingDescription] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);

	const [startTime, setStartTime] = useState<Date | undefined>(undefined);
	const [endTime, setEndTime] = useState<Date | undefined>(undefined);

	const [showShareDialog, setShowShareDialog] = useState<string | undefined>(undefined);

	const createVoting = api.votings.createVoting.useMutation({
		onSuccess: async (data) => {
			await utils.votings.invalidate();
			setShowShareDialog(data?.short_id);

			toast.dismiss();
			toast.success("Voting created successfully");
		},
		onError: (error) => {
			toast.dismiss();
			if (error.data?.code === "TOO_MANY_REQUESTS") {
				toast.error("Too many requests. Please slow down.");
			} else {
				toast.error(`Failed to create voting: ${error.message}`);
			}
		},
	});

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		void requireLogin(() => {
			if (startTime && endTime && startTime >= endTime) {
				toast.error("Start time must be before end time");
				return;
			}

			createVoting.mutate({
				name: votingName,
				description: votingDescription,
				public: !isPrivate,
				starts_at: startTime ?? null,
				ends_at: endTime ?? null,
			});

			toast.info("Creating voting...");
		});
	}

	return (
		<div
			className="md:relative md:mx-auto md:max-w-3xl md:rounded-lg md:bg-white md:p-5 md:shadow-md md:dark:bg-stone-900
				md:top-10"
		>
			<form onSubmit={handleSubmit} className="flex flex-col gap-5 px-2 dark:text-white">
				<div className="font-montserrat font-semibold md:text-2xl">Voting Information</div>
				<div className="flex flex-col gap-4 px-2">
					<FieldGroup>
						<Field className="">
							<FieldLabel htmlFor="input-field-username">Title</FieldLabel>
						<Input
							id="input-field-username"
							type="text"
							placeholder="Olivia's Birthday"
							defaultValue={initialName ?? ""}
							onChange={(e) => setVotingName(e.target.value)}
							required
						/>
							<FieldDescription>*required</FieldDescription>
						</Field>
						<Field className="">
							<FieldLabel htmlFor="input-field-username">Description</FieldLabel>
							<Input
								id="input-field-username"
								type="text"
								placeholder="our favourite songs!"
								onChange={(e) => setVotingDescription(e.target.value)}
							/>
							<FieldDescription>
								*optional <br></br> min. 3 characters
							</FieldDescription>
						</Field>
					</FieldGroup>
					<div className="flex items-center gap-2">
						<Lock size={15} />
						<label htmlFor="public" className="text-sm font-medium dark:text-white">
							Private
						</label>
						<Checkbox checked={isPrivate} onCheckedChange={() => setIsPrivate(!isPrivate)} />
					</div>
				</div>
				<Separator />
				<OptionalTime date={startTime} setDate={setStartTime} title={"Start Time"} />
				<OptionalTime date={endTime} setDate={setEndTime} title={"End Time"} className="pb-50 md:pb-5" />
				<div
					className="md:color-white fixed inset-x-0 bottom-0 mx-auto flex w-screen justify-center
						bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.7)_60%,var(--background-color)_100%)] pt-2
						pb-15 backdrop-blur-[2px] md:static md:max-w-2xl md:p-0 md:block"
				>
					<button
						type="submit"
						className="flex w-[75vw] cursor-pointer items-center justify-center gap-2 rounded-2xl bg-indigo-500 p-2
							text-xl font-semibold md:w-2xl dark:text-white hover:bg-indigo-400 disabled:cursor-not-allowed
							transition-all duration-200 ease-in-out disabled:bg-gray-400 hover:text-white"
						disabled={createVoting.isPending}
						defaultChecked={true}
					>
						{createVoting.isPending ? "Creating..." : "Create"}
						{createVoting.isPending ? <PlayIcon type="loading" className="m-2 h-6 w-6" /> : <Plus />}
					</button>
				</div>
			</form>
			<NotLoggedIn />
			{showShareDialog !== undefined && <ShareVotingDialog shortId={showShareDialog} />}
		</div>
	);
}
