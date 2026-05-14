import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function SkeletonSongCard() {
	return (
		<div className="flex w-[90vw] items-center justify-between gap-5 rounded-3xl bg-[#F0F0F0] p-2.5 md:w-2xl dark:bg-[#252525]">
			<div className="flex min-w-0 flex-1 items-center gap-2">
				<SkeletonTheme baseColor={"#C2C2C2"} highlightColor="#D0D0D0">
					<Skeleton width={"4rem"} height={"4rem"} borderRadius="15px" />

					<div className="flex min-w-0 flex-col leading-tight">
						<div className="font-montserrat truncate text-[1.15rem] font-semibold">
							<Skeleton width={"min(20rem, 40vw)"} borderRadius="7px" />
						</div>
						<div className="font-montserrat truncate text-sm text-gray-600 dark:text-gray-200">
							<Skeleton width={"min(16rem, 35vw)"} borderRadius="7px" />
						</div>
					</div>
				</SkeletonTheme>
			</div>
		</div>
	);
}
