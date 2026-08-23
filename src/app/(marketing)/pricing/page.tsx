import type { Metadata } from "next";
import LandingNav from "~/features/landing/LandingNav";

export const metadata: Metadata = {
	title: "Pricing",
	description: "Simple, transparent pricing for Audlect music voting. Start for free.",
	alternates: {
		canonical: "https://audlect.nicodenetworks.com/pricing",
	},
};

export default function pricing() {
	return (
		<div className="bg-white w-full h-screen flex flex-col items-center md:py-5">
			<LandingNav />
			<div className="py-50">
				<div className={"heading1 font-montserrat text-center text-4xl font-bold text-company lg:text-6xl"}>
					Audlect is currently free!
				</div>
				<div
					className={`heading2small font-inter text-center text-2xl font-normal text-neutral-400 text-shadow-2xs
						lg:text-3xl dark:text-gray-300`}
				>
					sponsor us to continue this development
				</div>
			</div>
		</div>
	);
}
