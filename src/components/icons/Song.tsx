import React from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";

interface LikeIconProps {
  liked: boolean;
}

interface PlusIconProps {
  added: boolean;
}

export function LikeIcon({ liked }: LikeIconProps) {
  return liked ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28.5"
      height="25"
      viewBox="0 0 33 29"
      fill="none"
    >
      <path
        d="M2.4875 14.747L16.5 29L30.5125 14.747C33.8292 11.3734 33.8292 5.90378 30.5125 2.53019C27.1958 -0.843397 21.8185 -0.843397 18.5018 2.53019L16.5 4.56633L14.4982 2.53019C11.1815 -0.843396 5.80417 -0.843397 2.4875 2.53019C-0.829167 5.90378 -0.829167 11.3734 2.4875 14.747Z"
        fill="#D1345B"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28.5"
      height="24"
      viewBox="0 0 33 29"
      fill="none"
    >
      <path
        d="M19.5713 3.58203C22.3001 0.806351 26.7135 0.806426 29.4424 3.58203C32.1852 6.37196 32.1852 10.9054 29.4424 13.6953L16.5 26.8604L3.55762 13.6953C0.814756 10.9054 0.814756 6.37196 3.55762 3.58203C6.28651 0.806426 10.6999 0.806351 13.4287 3.58203L15.4307 5.61816L16.5 6.70605L17.5693 5.61816L19.5713 3.58203Z"
        stroke="#7F7F7F"
        strokeWidth="3"
      />
    </svg>
  );
}

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: () => {
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    };
  },
  exit: { pathLength: 0, opacity: 0, transition: { duration: 0.2 } },
};

export function PlusIcon({ added }: PlusIconProps) {
  return (
    <AnimatePresence mode="wait" initial={true}>
      {!added ? (
        <motion.svg
          key="plus"
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.path
            variants={draw}
            d="M9.5 2V17M2 9.5H17"
            stroke="#54B886"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      ) : (
        <motion.svg
          key="cross"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.path
            variants={draw}
            d="M2.19686 2.1967L12.8035 12.8033M2.19686 12.8033L12.8035 2.1967"
            stroke="#D1345B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      )}
    </AnimatePresence>
  );
}
