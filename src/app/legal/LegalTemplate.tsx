import React from "react";
import Footer from "~/components/layout/global/Footer";

interface ILegalSection {
	heading: string;
	content: string | React.ReactNode;
}

interface ILegalTemplate {
	title: string;
	website: string;
	lastModified: string;
	sections: ILegalSection[];
}

export default function LegalTemplate({ title, website, lastModified, sections }: ILegalTemplate) {
	return (
		<section className="flex min-h-screen flex-col gap-10">
			<div className="flex flex-col items-center justify-center gap-3.5 px-2 dark:text-white">
				<div className="pt-20 text-center">
					<div className="text-3xl font-bold">{title}</div>
					<div className="text-lg font-semibold">{website}</div>
				</div>
				<span className="">LAST MODIFIED: {lastModified}</span>
				<div className="flex flex-col gap-2 pt-10 md:max-w-svh">
					{sections.map((section, index) => (
						<div key={index}>
							<span className="pl-2 font-semibold">{section.heading}</span>
							<p className="pl-5 text-pretty">{section.content}</p>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</section>
	);
}
