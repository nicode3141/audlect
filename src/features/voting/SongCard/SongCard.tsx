import Image from "next/image";
import React, { useMemo } from "react";
import { AddSongButton, LikeButton } from "~/components/ui/SongButtons/SongButtons";
import MoreIcon from "~/components/icons/MoreIcon";
import { nop } from "~/lib/utils";
import type { TSongMetadata } from "~/types/songs";
import PlayIcon from "~/components/icons/PlayIcon";
import { easeOut, motion, type useInView } from "motion/react";

interface SongCardProps {
	metadata: TSongMetadata;
	added: boolean;
	addedSearchResult?: boolean;
	liked?: boolean;
	onLike?: () => void;
	onMore?: () => void;
	onAdd?: () => void;
	onPlay?: () => void;
	playState?: "play" | "pause" | "loading";
	isLoadingLike?: boolean;
	isLoadingAdd?: boolean;
}

export default React.memo(function SongCard({
	metadata,
	added,
	addedSearchResult,
	liked,
	onLike,
	onMore,
	onAdd,
	onPlay,
	playState,
	isLoadingLike,
	isLoadingAdd,
}: SongCardProps) {
	const motionProps = useMemo(
		() => ({
			initial: { scaleX: 0.96, opacity: 0.5 },
			whileInView: { scaleX: 1, opacity: 1 },
			transition: { duration: 0.3, ease: easeOut },
			viewport: { once: true },
		}),
		[],
	);

	return (
		<motion.div
			className="flex w-[90vw] items-center justify-between gap-5 rounded-3xl bg-[#F0F0F0] p-2.5 md:w-2xl dark:bg-[#252525]"
			{...motionProps}
		>
			<div className="flex min-w-0 flex-1 items-center gap-2">
				<div className="flex shrink-0 items-center justify-center">
					<button
						className="absolute z-10 flex cursor-pointer items-center justify-center"
						onClick={onPlay ?? nop}
						aria-label="play-button"
					>
						<PlayIcon type={playState} className="h-10 w-10" />
					</button>
					<Image
						src={metadata.cover_image ?? ""}
						alt={metadata.song_name}
						width={90}
						height={90}
						loading="lazy"
						className="h-16 w-16 rounded-xl"
						blurDataURL="ImagePlaceholder.png"
						onError={(e) => (e.currentTarget.src = "/ImagePlaceholder.png")}
						unoptimized
					/>
				</div>
				<div className="flex min-w-0 flex-col leading-tight">
					<div className="font-montserrat truncate text-[1.15rem] font-semibold dark:text-white">
						{metadata.song_name}
					</div>
					<div className="font-montserrat truncate text-sm text-gray-600 dark:text-gray-200">
						{metadata.song_artists}
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between gap-3 p-2">
				{added ? (
					<>
						<div className="flex flex-col gap-1">
							<LikeButton
								liked={liked ?? false}
								isLoadingLike={isLoadingLike ?? false}
								handleLike={onLike ?? nop}
							></LikeButton>
							<div className="text-center text-sm text-gray-700 select-none dark:text-gray-200">
								{metadata.likes_total}
							</div>
						</div>
						<button className="cursor-pointer px-1 py-4" aria-label="more-info" onClick={onMore ?? nop}>
							<MoreIcon />
						</button>
					</>
				) : (
					<AddSongButton
						added={addedSearchResult ?? false}
						isLoadingAdd={isLoadingAdd ?? false}
						handleAdd={onAdd ?? nop}
					></AddSongButton>
				)}
			</div>
		</motion.div>
	);
});
