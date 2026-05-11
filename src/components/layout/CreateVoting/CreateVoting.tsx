"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { api } from "~/trpc/react";

export default function CreateVoting() {
	const router = useRouter();
	const utils = api.useUtils();

	const [votingName, setVotingName] = useState("");
	const [votingDescription, setVotingDescription] = useState("");
	const [isPublic, setIsPublic] = useState(false);

	const createVoting = api.votings.createVoting.useMutation({
		onSuccess: async (data) => {
			await utils.votings.invalidate();
			router.push(`/voting/${data?.short_id}`);
		},
	});

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		createVoting.mutate({
			name: votingName,
			description: votingDescription,
			public: isPublic,
		});
	}

	return (
		<div className="p-5">
			<Link href="/voting" className="font-montserrat inline-flex items-center gap-4 text-xl font-bold dark:text-white">
				<ArrowLeft strokeWidth={2.4} />
				Create New Voting
			</Link>
			<div className="pt-10">
				<form onSubmit={handleSubmit} className="flex flex-col gap-5 dark:text-white">
					<input
						type="text"
						placeholder="Olivia's Birthday"
						minLength={3}
						maxLength={100}
						required
						onChange={(e) => setVotingName(e.target.value)}
						className="rounded-lg p-2"
					/>
					<input
						type="text"
						placeholder="Song Voting"
						minLength={3}
						maxLength={100}
						required
						onChange={(e) => setVotingDescription(e.target.value)}
						className="rounded-lg p-2"
					/>
					<div className="flex items-center gap-2">
						<input id="public" type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
						<label htmlFor="public" className="text-sm font-medium dark:text-white">
							Public
						</label>
					</div>

					<button type="submit" className="rounded-2xl bg-indigo-500 p-2 text-lg dark:text-white">
						Create
					</button>
				</form>
			</div>
		</div>
	);
}
