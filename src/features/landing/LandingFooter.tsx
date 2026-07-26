import Link from "next/link";
import React from "react";

const footerLinks = [
	{
		title: "Product",
		links: [
			{ label: "Create your voting", href: "/voting/new" },
			{ label: "Browse events", href: "/voting/" },
			{ label: "Pricing", href: "/pricing" },
			{ label: "Feedback", href: "https://forms.gle/um6yszPE2oirzFg47" },
		],
	},
	{
		title: "Audlect",
		links: [
			{ label: "About", href: "/" },
			{ label: "Privacy Policy", href: "/legal/privacy" },
			{ label: "Terms & Conditions", href: "/legal/terms" },
			{ label: "Cookie Policy", href: "/legal/cookies" },
			{ label: "Guidelines", href: "/legal/terms" },
		],
	},
	{
		title: "By nicode3141",
		links: [
			{ label: "Github", href: "https://github.com/nicode3141" },
			{ label: "Twitter", href: "https://x.com/nicode3141" },
			{ label: "nicodenetworks", href: "https://nicodenetworks.com/" },
		],
	},
];

export default function LandingFooter() {
	return (
		<footer className="p-7 w-full flex flex-col gap-10">
			<div className="flex gap-2 items-end">
				<img src={"/app-logo.svg"} alt="Audlect Logo" width={35} />
				<div className="text-company font-nunito font-extrabold text-3xl text-shadow-md leading-[.9]">Audlect</div>
			</div>
			<section className="flex flex-col gap-5 font-montserrat font-semibold text-lg">
				{footerLinks.map((section) => (
					<div key={section.title} className="flex flex-col gap-3">
						<h3 className="text-neutral-600">{section.title}</h3>
						<ul className="text-black">
							{section.links.map((link) => (
								<li key={link.label}>
									<Link href={link.href}>{link.label}</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</section>
		</footer>
	);
}
