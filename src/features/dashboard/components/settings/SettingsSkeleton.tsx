import { Card, CardContent } from "~/shared/ui/card";
import { Skeleton } from "~/shared/ui/skeleton";

export default function SettingsSkeleton() {
	return (
		<div className="px-4 pb-6">
			<div className="px-6 py-4 pb-10">
				<Skeleton className="h-7 w-24 mb-2" />
				<Skeleton className="h-5 w-72" />
			</div>
			<Card>
				<CardContent className="flex flex-col gap-3 p-3 px-4">
					<div className="space-y-2">
						<Skeleton className="h-5 w-28" />
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-5 w-40" />
						<Skeleton className="h-10 w-full" />
					</div>
					<Skeleton className="h-px w-full" />
					<Skeleton className="h-6 w-20" />
					<Skeleton className="h-px w-full" />
					<div className="space-y-3">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
					</div>
					<Skeleton className="h-px w-full" />
					<div className="space-y-3">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
					</div>
					<Skeleton className="h-px w-full" />
					<div className="space-y-3">
						<Skeleton className="h-6 w-32" />
						<Skeleton className="h-6 w-36" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
