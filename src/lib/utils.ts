import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const nop = () => {
	//no operation
};

export function scrollSmoothToTop(delay: number) {
	setTimeout(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, delay);
}

export function clampInt(value: unknown, fallback: number, min = 0, max = 1000) {
	const n = Number(value);
	if (!Number.isFinite(n) || Number.isNaN(n)) return fallback;
	return Math.max(min, Math.min(max, Math.trunc(n)));
}
