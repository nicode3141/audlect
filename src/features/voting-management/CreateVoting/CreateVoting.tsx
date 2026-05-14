"use client";

import { Lock, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Checkbox } from "~/components/ui/@shadcn/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/components/ui/@shadcn/field";
import { Input } from "~/components/ui/@shadcn/input";
import { Separator } from "~/components/ui/@shadcn/separator";
import NotLoggedIn from "~/features/voting-site/Popups/NotLoggedIn";
import { useRequireLogin } from "~/hooks/useRequireLogin";
import { api } from "~/trpc/react";
import TimePicker from "../../../components/layout/global/TimePicker";
import PlayIcon from "~/components/icons/PlayIcon";
import { toast } from "sonner";

export default function CreateVoting() {
	const router = useRouter();
	const utils = api.useUtils();
	const { requireLogin } = useRequireLogin();

	const [votingName, setVotingName] = useState("");
	const [votingDescription, setVotingDescription] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);

	const [startTime, setStartTime] = useState<Date | undefined>(undefined);
	const [endTime, setEndTime] = useState<Date | undefined>(undefined);

	const createVoting = api.votings.createVoting.useMutation({
		onSuccess: async (data) => {
			await utils.votings.invalidate();
			router.push(`/voting/${data?.short_id}`);
			toast.dismiss();
			toast.success("Voting created successfully");
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
			});

			toast.info("Creating voting...");
		});
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="flex flex-col gap-5 px-2 dark:text-white">
				<div className="font-montserrat font-semibold">Voting Information</div>
				<div className="flex flex-col gap-4 px-2">
					<FieldGroup>
						<Field className="">
							<FieldLabel htmlFor="input-field-username">Title</FieldLabel>
							<Input
								id="input-field-username"
								type="text"
								placeholder="Olivia’s Birthday"
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
				<div className="flex flex-col gap-4">
					<div className="font-montserrat flex items-center gap-4 font-semibold">
						Start Time
						<Checkbox
							checked={startTime !== undefined}
							onCheckedChange={() => (startTime !== undefined ? setStartTime(undefined) : setStartTime(new Date()))}
						/>
					</div>
					{startTime !== undefined && <TimePicker date={startTime} setDate={setStartTime} />}
				</div>
				<div className="flex flex-col gap-4 pb-50">
					<div className="font-montserrat flex items-center gap-4 font-semibold">
						End Time
						<Checkbox
							checked={endTime !== undefined}
							onCheckedChange={() => (endTime !== undefined ? setEndTime(undefined) : setEndTime(new Date()))}
						/>
					</div>
					{endTime !== undefined && <TimePicker date={endTime} setDate={setEndTime} />}
				</div>
				<div className="fixed inset-x-0 bottom-0 mx-auto flex min-w-screen justify-center bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.7)_60%,var(--background-color)_100%)] pt-2 pb-15 backdrop-blur-[2px]">
					<button
						type="submit"
						className="flex w-[75vw] cursor-pointer items-center justify-center gap-2 rounded-2xl bg-indigo-500 p-2 text-xl font-semibold dark:text-white"
						disabled={createVoting.isPending}
						defaultChecked={true}
					>
						{createVoting.isPending ? "Creating..." : "Create"}
						{createVoting.isPending ? <PlayIcon type="loading" className="m-2 h-6 w-6" /> : <Plus />}
					</button>
				</div>
			</form>
			<NotLoggedIn />
		</div>
	);
}
