export type SortMethodsType = "Likes" | "Least Likes" | "Random" | "A-Z" | "Date Added";

type ToastVariant = "default" | "success" | "error" | "info" | "warning";

export type RenderToast = ({ variant, message }: { variant?: ToastVariant; message?: string }) => void;

export interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	total: number;
}
