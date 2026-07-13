import { Globe, Copy, Check } from "lucide-react";
import React from "react";
import CopyLinkButton from "~/shared/components/CopyLinkButton";
import { Button } from "~/shared/ui/button";

export default function LinkCard({ shortId }: { shortId: string }) {
	return (
		<div className="flex flex-col gap-3 py-2 md:flex-row md:items-center md:gap-5">
			<div className="flex gap-5 items-center">
				<Globe />
				<div className="flex flex-col">
					<div className="text-xs md:text-md text-neutral-600 dark:text-neutral-200 font-inter">Public Link</div>
					<div className="flex-wrap text-sm md:text-base font-mono text-neutral-900 dark:text-neutral-300 break-all">
						{`https://audlect.nicodenetworks.com/voting/${shortId}`}
					</div>
				</div>
			</div>
			<CopyLinkButton
				className="bg-neutral-900 transition-colors duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
				url={`https://audlect.nicodenetworks.com/voting/${shortId}`}
				copyChildren={
					<>
						<Copy /> Copy Link
					</>
				}
				copiedChildren={
					<>
						<Check /> Copied Link
					</>
				}
			></CopyLinkButton>
		</div>
	);
}
