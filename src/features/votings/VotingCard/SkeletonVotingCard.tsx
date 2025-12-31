import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function SkeletonVotingCard() {
	return (
		<div className="flex flex-col gap-2 rounded-md border border-gray-300 p-2 shadow-sm hover:shadow-md md:place-self-auto dark:border-none dark:bg-[#252525] dark:drop-shadow-sm dark:drop-shadow-gray-600">
			<SkeletonTheme>
				<div className="flex-[3]">
					<Skeleton
						width={360}
						height={200}
						borderRadius="15px"
						containerClassName="aspect-8/4 w-[10vw] rounded-sm object-cover"
					/>
				</div>
				<div className="max-w-[90vw] px-1 pb-1">
					<div className="font-inter truncate dark:text-white">
						<Skeleton width={"min(20rem, 40vw)"} borderRadius="7px" />
						<Skeleton width={"min(16rem, 35vw)"} borderRadius="7px" />
					</div>
				</div>
			</SkeletonTheme>
		</div>
	);
}
