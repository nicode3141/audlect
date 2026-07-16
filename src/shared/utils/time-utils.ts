export type TimeFormat = "12h" | "24h";

export interface Time {
	h: number;
	m: number;
}

export function pad(n: number): string {
	return n.toString().padStart(2, "0");
}

export function parse24(value?: string): Time | null {
	if (!value) return null;
	const match = /^(\d{1,2}):(\d{1,2})$/.exec(value.trim());
	if (!match) return null;
	const h = Number(match[1]);
	const m = Number(match[2]);
	if (h < 0 || h > 23 || m < 0 || m > 59) return null;
	return { h, m };
}

export function parseFreeText(text: string, format: TimeFormat): Time | null {
	const cleaned = text.trim().toLowerCase();
	if (!cleaned) return null;

	const period = cleaned.includes("am") ? "am" : cleaned.includes("pm") ? "pm" : null;
	const digits = cleaned.replace(/[^\d:.]/g, "").replace(".", ":");

	let h: number;
	let m: number;

	if (digits.includes(":")) {
		const [hh, mm] = digits.split(":");
		h = Number(hh);
		m = Number(mm ?? "0");
	} else if (digits.length <= 2) {
		h = Number(digits);
		m = 0;
	} else {
		h = Number(digits.slice(0, digits.length - 2));
		m = Number(digits.slice(-2));
	}

	if (Number.isNaN(h) || Number.isNaN(m) || m > 59 || m < 0) return null;

	if (format === "12h" || period) {
		if (h < 1 || h > 12) return null;
		if (period === "pm" && h !== 12) h += 12;
		if (period === "am" && h === 12) h = 0;
	} else {
		if (h < 0 || h > 23) return null;
	}

	return { h, m };
}

export function to12(h: number): { hour12: number; period: "AM" | "PM" } {
	const period = h >= 12 ? "PM" : "AM";
	let hour12 = h % 12;
	if (hour12 === 0) hour12 = 12;
	return { hour12, period };
}

export function from12(hour12: number, period: "AM" | "PM"): number {
	let h = hour12 % 12;
	if (period === "PM") h += 12;
	return h;
}

export function formatTime(h: number, m: number, format: TimeFormat): string {
	if (format === "24h") return `${pad(h)}:${pad(m)}`;
	const { hour12, period } = to12(h);
	return `${pad(hour12)}:${pad(m)} ${period}`;
}
