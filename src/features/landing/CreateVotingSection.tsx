import { ArrowRight } from "lucide-react";
import React from "react";
import HomeButton from "~/shared/components/HomeButton";
import { cn } from "~/shared/utils/utils";

export default function CreateVotingSection() {
	return (
		<section className="flex flex-col items-center gap-10 p-5 pt-15 pb-15">
			<div className="flex flex-col gap-1 text-center">
				<div className="font-inter font-bold text-black text-4xl">
					Create <b>your</b> <span className="text-company">Voting today!</span>
				</div>
				<p className="text-neutral-400 text-lg font-medium font-inter">takes less than 2 mins. </p>
			</div>
			<div className="flex flex-col gap-5">
				<input
					type="text"
					placeholder="Your next event..."
					data-slot="input"
					className={cn(
						`h-9 w-full min-w-0 rounded-lg border-2 border-neutral-400 bg-transparent px-6 py-6 text-xl shadow-lg
						text-neutral-900 font-semibold transition-[color,box-shadow] outline-none selection:bg-primary
						selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm
						file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none
						md:text-sm dark:bg-input/30 dark:placeholder:text-gray-500 dark:focus-visible:ring-ring/50
						dark:focus-visible:border-ring`,
						"focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
						"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
					)}
				/>
				<div
					className="bg-linear-to-r from-yellow-300 to-orange-400 text-3xl font-extrabold font-montserrat p-5 py-15
						rounded-xl text-shadow-2xs"
				>
					Your next event...
				</div>
				<button
					className="py-3 rounded-[10px] font-inter text-lg font-bold cursor-pointer transition-all duration-200
						ease-in-out whitespace-nowrap flex items-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-neutral-800
						text-white hover:text-gray-500 px-10 gap-2 justify-center"
				>
					Create <ArrowRight strokeWidth={3} />
				</button>
			</div>
		</section>
	);
}
