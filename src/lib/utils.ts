import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isToday, isYesterday, isThisWeek, isThisYear, format } from "date-fns";

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
