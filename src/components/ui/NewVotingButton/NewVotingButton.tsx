import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NewVotingButton() {
	return (
		<Link
			href="/voting/new"
			className="cursor-pointer rounded-full bg-black p-4 shadow-lg shadow-black/50 transition-transform hover:scale-110"
		>
			<span className="inline-flex items-center gap-2 font-semibold text-white">
				Create Voting
				<Plus color="white" size={30} strokeWidth={3} />
			</span>
		</Link>
	);
}
