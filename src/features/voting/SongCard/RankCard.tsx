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

// Custom comparison to prevent re-renders when only metadata reference changes
function areSongCardPropsEqual(prevProps: SongCardProps, nextProps: SongCardProps): boolean {
	// Compare all props except metadata (we'll do deep compare for that)
	if (
		prevProps.added !== nextProps.added ||
		prevProps.addedSearchResult !== nextProps.addedSearchResult ||
		prevProps.liked !== nextProps.liked ||
		prevProps.onLike !== nextProps.onLike ||
		prevProps.onMore !== nextProps.onMore ||
		prevProps.onAdd !== nextProps.onAdd ||
		prevProps.onPlay !== nextProps.onPlay ||
		prevProps.playState !== nextProps.playState ||
		prevProps.isLoadingLike !== nextProps.isLoadingLike ||
		prevProps.isLoadingAdd !== nextProps.isLoadingAdd
	) {
		return false;
	}

	// Deep compare metadata
	const prev = prevProps.metadata;
	const next = nextProps.metadata;
	return (
		prev.song_id === next.song_id &&
		prev.deezer_id === next.deezer_id &&
		prev.isrc === next.isrc &&
		prev.voting_id === next.voting_id &&
		prev.song_name === next.song_name &&
		prev.song_artists === next.song_artists &&
		prev.cover_image === next.cover_image &&
		prev.rank === next.rank &&
		prev.added_by === next.added_by &&
		prev.likes_total === next.likes_total &&
		prev.liked === next.liked
	);
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
		}),
		[],
	);

	return (
		<motion.div
			className="flex w-full max-w-md min-w-0 flex-col items-center gap-3 overflow-hidden rounded-3xl p-4 md:w-full md:flex-row md:items-center md:gap-5 dark:bg-[#252525]"
			{...motionProps}
		>
			<div className="flex min-w-0 flex-1 items-center gap-3">
				<div className="font-montserrat text-lg font-semibold text-gray-800 dark:text-white">#{metadata.rank}</div>
				<div className="flex items-center gap-2">
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
			</div>
		</motion.div>
	);
}, areSongCardPropsEqual);
