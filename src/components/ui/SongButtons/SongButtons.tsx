import React from "react";
import { motion } from "motion/react";
import { LikeIcon, PlusIcon } from "~/components/icons/Song";

interface LikeButtonProps {
	liked: boolean;
	handleLike: () => void;
	isLoadingLike?: boolean;
}

interface AddSongButtonProps {
	added: boolean;
	handleAdd: () => void;
	isLoadingAdd: boolean;
}

// Memoize motion props to prevent recreation on every render
const likeButtonInitial = { opacity: 0, scale: 0.5 };
const likeButtonAnimate = { opacity: 1, scale: 1 };
const likeButtonTransition = { type: "spring" as const, duration: 0.8, bounce: 0.4 };
const likeButtonWhileTap = { scale: 2 };

const addButtonInitial = { opacity: 0, scale: 0.5 };
const addButtonAnimate = { opacity: 1, scale: 1 };
const addButtonTransition = { type: "tween" as const, duration: 0.45, bounce: 0.51 };
const addButtonWhileTap = { scale: 2 };

export const LikeButton = React.memo(function LikeButton({ liked, handleLike, isLoadingLike }: LikeButtonProps) {
	return (
		<motion.button
			className="cursor-pointer"
			initial={likeButtonInitial}
			animate={likeButtonAnimate}
			transition={likeButtonTransition}
			whileTap={likeButtonWhileTap}
			onClick={handleLike}
			aria-label="like-button"
			disabled={isLoadingLike}
		>
			<LikeIcon liked={liked}></LikeIcon>
		</motion.button>
	);
});

export const AddSongButton = React.memo(function AddSongButton({ added, handleAdd, isLoadingAdd }: AddSongButtonProps) {
	return (
		<motion.button
			className="cursor-pointer rounded-full bg-gray-300 p-3 dark:bg-[#191919]"
			initial={addButtonInitial}
			animate={addButtonAnimate}
			transition={addButtonTransition}
			whileTap={addButtonWhileTap}
			onClick={handleAdd}
			aria-label="add-song-button"
			disabled={isLoadingAdd}
		>
			<PlusIcon added={added}></PlusIcon>
		</motion.button>
	);
});
