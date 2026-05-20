import React from "react";
import { Skeleton } from "~/components/ui/@shadcn/skeleton";

export default function VotingElementSkeleton() {
	return (
		<>
			<div className="flex justify-evenly items-center p-2 gap-4 py-3">
				<div className="flex flex-col gap-2 flex-1">
					<Skeleton className="h-5.25 w-37.5 rounded-full" />
					<Skeleton className="h-3.75 w-25 rounded-full" />
				</div>
				<Skeleton className="h-3.75 w-18.75 rounded-full"></Skeleton>
				<div className="flex gap-2 justify-end">
					<Skeleton className="h-7.5 w-7.5 rounded-sm"></Skeleton>
					<Skeleton className="h-7.5 w-7.5 rounded-sm"></Skeleton>
				</div>
			</div>
		</>
	);
}
