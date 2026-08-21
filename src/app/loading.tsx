import { Loader2 } from "lucide-react";
import AudlectTitle from "~/shared/components/AudlectTitle";

export default function Loading() {
	return (
		<div className={"font-inter text-center text-2xl items-center flex justify-center h-screen w-screen"}>
			<div className="flex items-center justify-center flex-col gap-3">
				<AudlectTitle />
				<Loader2 className="animate-spin" />
			</div>
		</div>
	);
}
