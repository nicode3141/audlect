import { AnimatePresence } from "motion/react";
import Link from "next/link";
import React from "react";
import { DeleteIcon, LinkIcon, ReportIcon } from "~/shared/icons/Icons";
import PlayIcon from "~/shared/icons/PlayIcon";
import PopupCard from "~/shared/components/PopupCard";
import { authClient } from "~/lib/auth-client";
import { api } from "~/trpc/react";
import type { TSongMetadata } from "~/types/songs";
import { toast } from "sonner";

interface ISongInfo {
	metadata: TSongMetadata;
	showPopup: boolean;
	ref: React.RefObject<HTMLDivElement | HTMLElement | null>;
	onRemove?: () => void;
}

export default React.memo(function SongInfo(props: ISongInfo) {
	const { metadata, showPopup, ref, onRemove } = props;
	const deleteSong = api.songs.deleteSong.useMutation({
		onError: (err) => {
			if (err.message) toast.error(err.message);
		},
	});
	const utils = api.useUtils();

	const { data: session } = authClient.useSession();
	const { data: membership } = api.votings.getMyMembership.useQuery(
		{ voting_id: metadata.voting_id },
		{ enabled: showPopup && !!session },
	);

	async function removeSong() {
		if (!metadata.song_id) return;
		deleteSong.mutate({ voting_id: metadata.voting_id, song_id: metadata.song_id });
		if (!deleteSong.error) {
			await Promise.all([utils.songs.songs.refetch(), utils.search.fullSearch.refetch()]);
			onRemove?.();
		}
	}

	return (
		showPopup && (
			<AnimatePresence>
				<PopupCard title="SONG" subtitle={metadata.song_name} ref={ref}>
					<Link
						className="flex min-w-3/4 items-center justify-center gap-2 truncate rounded-xl bg-gray-300 p-3 px-3.5
							text-nowrap md:min-w-10 md:rounded-none md:bg-transparent md:p-0 md:hover:pl-2 dark:bg-[#010101]"
						href={`https://www.deezer.com/de/track/${metadata.deezer_id}`}
					>
						<LinkIcon className="items-center text-black dark:text-white" />
						<span className="font-montserrat text-2xl font-bold md:text-xl dark:text-white">Open Song</span>
					</Link>
					{metadata.added_by === session?.user?.id ||
					membership?.role === "owner" ||
					membership?.role === "moderator" ? (
						<button
							className="flex min-w-3/4 cursor-pointer items-center justify-center gap-2 truncate rounded-xl bg-gray-300
								p-3 px-3.5 text-nowrap md:min-w-10 md:rounded-none md:bg-transparent md:p-0 md:hover:pl-2
								dark:bg-[#010101]"
							onClick={() => !deleteSong.isPending && removeSong()}
						>
							{!deleteSong.isPending ? (
								<DeleteIcon className="tems-center text-black dark:text-white" />
							) : (
								<PlayIcon type="loading" className="h-6 w-6" />
							)}
							<span className="font-montserrat text-2xl font-bold md:text-xl dark:text-white">Delete Song</span>
						</button>
					) : (
						<Link
							className="flex min-w-3/4 items-center justify-center gap-2 truncate rounded-xl bg-gray-300 p-3 px-3.5
								text-nowrap md:min-w-10 md:rounded-none md:bg-transparent md:p-0 md:hover:pl-2 dark:bg-[#010101]"
							href={`mailto:info@nicodenetworks.com?subject=[${metadata.voting_id}] Item Report (${metadata.song_name})`}
						>
							<ReportIcon className="tems-center text-black dark:text-white" />
							<span className="font-montserrat text-2xl font-bold md:text-xl dark:text-white">Report Song</span>
						</Link>
					)}
				</PopupCard>
			</AnimatePresence>
		)
	);
});
