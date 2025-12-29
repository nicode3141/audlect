"use client";

import React from "react";
import { api } from "~/trpc/react";
import Link from "next/link";
import Image from "next/image";

export default function page() {
	const publicVotings = api.votings.getPublicVotings.useQuery({
		limit: 10,
		page: 0,
		sort_method: "Date Added",
	});

	return (
		<div className="items- flex h-screen flex-col items-center justify-center gap-2">
			{publicVotings.data?.map((voting) => (
				<div key={voting.voting_id} className="">
					{voting.preview_image && <Image src={voting.preview_image} alt={voting.name} width={100} height={100} />}
					<div>{voting.name}</div>
					<div>{voting.description}</div>
					<div>{voting.voting_id}</div>
					<Link href={`/voting/${voting.short_id}`}>Go to Voting</Link>
				</div>
			))}
		</div>
	);
}
