import { Globe, Copy, Check } from "lucide-react";
import React from "react";
import CopyLinkButton from "~/shared/components/CopyLinkButton";
import { Button } from "~/shared/ui/button";

export default function LinkCard({ shortId }: { shortId: string }) {
	return (
		<div className="flex flex-col gap-3 py-2">
			<div className="flex gap-5 items-center">
				<Globe />
				<div className="flex flex-col">
					<div className="text-xs text-neutral-200 font-inter">Public Link</div>
					<div className="flex-wrap text-sm font-mono text-neutral-300 break-all">
						{`https://audlect.nicodenetworks.com/voting/${shortId}`}
					</div>
				</div>
			</div>
			<CopyLinkButton
				className="bg-neutral-900"
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
