import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "~/shared/utils/utils";

type ButtonVariant = "primary" | "secondary" | "black";

interface HomeButtonProps {
	variant: ButtonVariant;
	href: string;
	children?: React.ReactNode;
}

const homeButtonVariants = cva(
	`py-3 rounded-[10px] font-inter text-lg font-bold cursor-pointer transition-all duration-200 ease-in-out whitespace-nowrap inline-block shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]`, //base css
	{
		variants: {
			variant: {
				primary: `bg-indigo-400 text-white hover:text-black px-5`,
				secondary: `bg-gray-300 text-black hover:text-white px-10`,
				black: `bg-black text-white hover:text-gray-500 px-5`,
			},
		},
		defaultVariants: {
			variant: `primary`,
		},
	},
);

export default function HomeButton({ variant, href, children }: HomeButtonProps) {
	return (
		<div>
			<Link href={href} className={cn(homeButtonVariants({ variant }))}>
				{children}
			</Link>
		</div>
	);
}
