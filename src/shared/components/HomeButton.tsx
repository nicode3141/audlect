import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "~/shared/utils/utils";

type ButtonVariant = "primary" | "secondary";

interface HomeButtonProps {
	variant: ButtonVariant;
	href: string;
	children?: React.ReactNode;
}

const homeButtonVariants = cva(
	`py-3 rounded-[10px] font-inter text-xl font-bold cursor-pointer transition-all duration-200 ease-in-out whitespace-nowrap`, //base css
	{
		variants: {
			variant: {
				primary: `bg-indigo-400 text-white hover:text-black px-5`,
				secondary: `bg-gray-300 text-black hover:text-white px-10`,
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
