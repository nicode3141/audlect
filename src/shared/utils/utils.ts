import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isToday, isYesterday, isThisWeek, format } from "date-fns";
import type { TimeLeft } from "~/types/global";

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

export function formatRelativeDate(date: Date | string) {
	const d = typeof date === "string" ? new Date(date) : date;

	if (isToday(d)) {
		return `Today, ${format(d, "h:mm a")}`;
	}

	if (isYesterday(d)) {
		return "Yesterday";
	}

	if (isThisWeek(d)) {
		return "This Week";
	}

	return format(d, "MMM d, yyyy");
}

export function getTimeLeft(target: Date): TimeLeft {
	const total = target.getTime() - Date.now();

	if (total <= 0) {
		return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
	}

	return {
		total,
		days: Math.floor(total / (1000 * 60 * 60 * 24)),
		hours: Math.floor((total / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((total / (1000 * 60)) % 60),
		seconds: Math.floor((total / 1000) % 60),
	};
}
