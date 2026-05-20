import React from "react";
import { Skeleton } from "~/components/ui/@shadcn/skeleton";

export default function VotingElementSkeleton() {
	return (
		<>
			<div className="flex justify-evenly items-center p-2 gap-4 py-3">
				<div className="flex flex-col gap-2 flex-1">
					<Skeleton className="h-[21px] w-[150px] rounded-full" />
					<Skeleton className="h-[15px] w-[100px] rounded-full" />
				</div>
				<Skeleton className="h-[15px] w-[75px] rounded-full"></Skeleton>
				<div className="flex gap-2 justify-end">
					<Skeleton className="h-[30px] w-[30px] rounded-sm"></Skeleton>
					<Skeleton className="h-[30px] w-[30px] rounded-sm"></Skeleton>
				</div>
			</div>
		</>
	);
}
