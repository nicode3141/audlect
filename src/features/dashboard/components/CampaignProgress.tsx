import { Calendar1 } from "lucide-react";
import React from "react";
import { Progress } from "~/shared/ui/progress";

export default function CampaignProgress({
	startsAt,
	endsAt,
	createdAt,
}: {
	startsAt?: Date | string | null;
	endsAt?: Date | string | null;
	createdAt?: Date | null | undefined;
}) {
	const start = startsAt ? new Date(startsAt) : null;
	const end = endsAt ? new Date(endsAt) : null;
	const created = createdAt ? new Date(createdAt) : null;
	const now = new Date();

	const totalMs = end && start ? end.getTime() - start.getTime() : 0;
	const elapsedMs = start ? now.getTime() - start.getTime() : 0;
	const progress = totalMs > 0 ? Math.round((elapsedMs / totalMs) * 100) : 25;

	const daysRemaining = end ? Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))) : null;
	const daysOnline = created
		? Math.max(0, Math.ceil((now.getTime() - created?.getTime()) / (1000 * 60 * 60 * 24)))
		: null;

	return (
		<div className="flex flex-col gap-3">
			<div className="font-inter flex text-sm">
				<div className="flex flex-1 gap-2 text-neutral-300 items-center">
					<Calendar1 size={17} />
					Voting Timeline
				</div>
				<div className="font-semibold">
					{daysRemaining !== null ? `${daysRemaining} days remaining` : `online for ${daysOnline} days`}
				</div>
			</div>
			<Progress value={Math.min(progress, 100)} />
			<div className="font-inter flex text-xs">
				<div className="flex flex-1 gap-2 text-neutral-300 items-center">
					{start?.toLocaleDateString("en-US", {
						month: "long",
						day: "numeric",
						year: "numeric",
					}) ??
						created?.toLocaleDateString("en-US", {
							month: "long",
							day: "numeric",
							year: "numeric",
						}) ??
						"No start date"}
				</div>
				<div className="flex flex-1 gap-2 text-neutral-300 items-center text-right justify-end">
					{end?.toLocaleDateString("en-US", {
						month: "long",
						day: "numeric",
						year: "numeric",
					}) ?? "No end date"}
				</div>
			</div>
		</div>
	);
}
