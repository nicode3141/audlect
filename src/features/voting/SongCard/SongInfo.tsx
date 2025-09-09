import { AnimatePresence } from "motion/react";
import Link from "next/link";
import React from "react";
import { LinkIcon, ReportIcon } from "~/components/icons/Icons";
import PopupCard from "~/components/popups/PopupCard";
import type { TSongMetadata } from "~/types/songs";

interface ISongInfo {
	metadata: TSongMetadata;
	showPopup: boolean;
	ref: React.RefObject<HTMLDivElement | HTMLElement | null>;
}

export default function SongInfo(props: ISongInfo) {
	const { metadata, showPopup, ref } = props;
	return (
		showPopup && (
			<AnimatePresence>
				<PopupCard title="SONG" subtitle={metadata.song_name} ref={ref}>
					<Link
						className="flex min-w-3/4 items-center justify-center gap-2 truncate rounded-xl bg-gray-300 p-3 px-3.5 text-nowrap dark:bg-[#010101]"
						href={`https://www.deezer.com/de/track/${metadata.deezer_id}`}
					>
						<LinkIcon className="items-center text-black dark:text-white" />
						<span className="font-montserrat text-2xl font-bold dark:text-white">Open Song</span>
					</Link>
					<Link
						className="flex min-w-3/4 items-center justify-center gap-2 truncate rounded-xl bg-gray-300 p-3 px-3.5 text-nowrap dark:bg-[#010101]"
						href={`mailto:info@nicodenetworks.com?subject=[${metadata.voting_id}] Item Report (${metadata.song_name})`}
					>
						<ReportIcon className="tems-center text-black dark:text-white" />
						<span className="font-montserrat text-2xl font-bold dark:text-white">Report Song</span>
					</Link>
				</PopupCard>
			</AnimatePresence>
		)
	);
}
