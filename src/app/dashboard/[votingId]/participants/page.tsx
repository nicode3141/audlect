"use client";

import { User } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { useParticipants, useSettings } from "~/features/dashboard/hooks/useDashboard";
import MoreIcon from "~/shared/icons/MoreIcon";

export default function Page() {
	const { votingId } = useParams<{ votingId: string }>();
	const { data: settings } = useSettings(votingId);
	const { data: users } = useParticipants(votingId);

	if (!settings) return null;

	return (
		<div className="px-4 pb-6">
			<div className="px-6 py-4 pb-10">
				<span className="font-montserrat font-semibold text-xl">Participants</span>
				<div className="font-montserrat text-sm">Manage access to your voting.</div>
			</div>
			<div className="flex flex-col gap-5 md:px-10">
				{users?.length === 0 && <div>No Users</div>}
				{users?.map((user, i) => (
					<div className="flex items-center" key={i}>
						<div className="flex items-center gap-4 flex-1">
							{user.image ? (
								<Image
									src={user.image ?? "/ImagePlaceholder.png"}
									alt={"user avatar"}
									width={90}
									height={90}
									loading="lazy"
									className="h-12 w-12 rounded-xl"
									blurDataURL="/ImagePlaceholder.png"
									onError={(e) => (e.currentTarget.src = "/ImagePlaceholder.png")}
									unoptimized
								/>
							) : (
								<div
									className="h-12 w-12 rounded-xl bg-neutral-200 dark:bg-neutral-500 flex items-center justify-center"
								>
									<User className="dark:text-black" size={28} />
								</div>
							)}

							<div className="flex min-w-0 flex-col leading-tight">
								<div className="font-montserrat truncate text-[1.15rem] font-semibold dark:text-white">{user.name}</div>
								<div className="font-montserrat truncate text-sm text-gray-600 dark:text-gray-200">{user.email}</div>
							</div>
						</div>
						<div className="flex px-2">
							<MoreIcon />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
