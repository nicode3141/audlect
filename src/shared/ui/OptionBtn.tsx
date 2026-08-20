import { cva } from "class-variance-authority";
import { cn } from "../utils/utils";

interface OptionBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant: "selected" | "disabled";
	className?: string;
	children?: React.ReactNode;
}

export default function OptionBtn({ variant, className, children, ...props }: OptionBtnProps) {
	const btnVariants = cva(
		` px-2 py-1 flex gap-2 rounded-lg font-inter
				 font-semibold text-md`, //base css
		{
			variants: {
				variant: {
					selected: `bg-company-second text-white `,
					disabled: `bg-transparent dark:bg-neutral-700 border text-neutral-600 border-neutral-100 hover:text-neutral-500 px-5 dark:text-neutral-200 hover:border-neutral-400 duration-200`,
				},
			},
			defaultVariants: {
				variant: `disabled`,
			},
		},
	);

	return (
		<button {...props} className={cn(btnVariants({ variant }), className)}>
			{children}
		</button>
	);
}
