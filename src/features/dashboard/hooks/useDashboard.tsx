"use client";

import { toast } from "sonner";
import { api } from "~/trpc/react";

export function useSettings(shortId: string) {
	return api.dashboard.getSettings.useQuery({ short_id: shortId });
}

export function useUpdateSettings() {
	return api.dashboard.updateSettings.useMutation({
		onError: () => {
			toast.error("Something went wrong.");
		},
	});
}

export function useAnalytics(shortId: string) {
	return api.dashboard.getAnalytics.useQuery({ short_id: shortId });
}
