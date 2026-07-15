import React, { useCallback } from "react";
import { motion } from "motion/react";
import { LikeIcon, PlusIcon } from "~/shared/icons/Song";
import { toast } from "sonner";

interface LikeButtonProps {
	liked: boolean;
	handleLike: () => void;
	isLoadingLike?: boolean;
	disabled?: boolean;
}

interface AddSongButtonProps {
	added: boolean;
	handleAdd: () => void;
	isLoadingAdd: boolean;
	disabled?: boolean;
}

const disabledToastMessage = "Voting is not currently active";

// Memoize motion props to prevent recreation on every render
const likeButtonInitial = { opacity: 0, scale: 0.5 };
const likeButtonAnimate = { opacity: 1, scale: 1 };
const likeButtonTransition = { type: "spring" as const, duration: 0.8, bounce: 0.4 };
const likeButtonWhileTap = { scale: 2 };

const addButtonInitial = { opacity: 0, scale: 0.5 };
const addButtonAnimate = { opacity: 1, scale: 1 };
const addButtonTransition = { type: "tween" as const, duration: 0.45, bounce: 0.51 };
const addButtonWhileTap = { scale: 2 };

export const LikeButton = React.memo(function LikeButton({ liked, handleLike, isLoadingLike = false, disabled = false }: LikeButtonProps) {
	const onClick = useCallback(() => {
		if (disabled) {
			toast.info(disabledToastMessage);
			return;
		}
		if (isLoadingLike) return;
		handleLike();
	}, [disabled, isLoadingLike, handleLike]);

	return (
		<motion.button
			className={`cursor-pointer${disabled ? " opacity-40" : ""}`}
			initial={likeButtonInitial}
			animate={likeButtonAnimate}
			transition={likeButtonTransition}
			whileTap={disabled ? undefined : likeButtonWhileTap}
			onClick={onClick}
			aria-label="like-button"
			aria-disabled={disabled || undefined}
		>
			<LikeIcon liked={liked}></LikeIcon>
		</motion.button>
	);
});

export const AddSongButton = React.memo(function AddSongButton({ added, handleAdd, isLoadingAdd = false, disabled = false }: AddSongButtonProps) {
	const onClick = useCallback(() => {
		if (disabled) {
			toast.info(disabledToastMessage);
			return;
		}
		if (isLoadingAdd) return;
		handleAdd();
	}, [disabled, isLoadingAdd, handleAdd]);

	return (
		<motion.button
			className={`cursor-pointer rounded-full bg-gray-300 p-3 dark:bg-[#191919]${disabled ? " opacity-40" : ""}`}
			initial={addButtonInitial}
			animate={addButtonAnimate}
			transition={addButtonTransition}
			whileTap={disabled ? undefined : addButtonWhileTap}
			onClick={onClick}
			aria-label="add-song-button"
			aria-disabled={disabled || undefined}
		>
			<PlusIcon added={added}></PlusIcon>
		</motion.button>
	);
});
