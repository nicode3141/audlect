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
