"use client";

import { error } from "node:console";
import { toast } from "sonner";
import { api, type RouterOutputs } from "~/trpc/react";

export type SettingsData = RouterOutputs["dashboard"]["getSettings"] | undefined;

export function useSettings(shortId: string) {
	return api.dashboard.getSettings.useQuery({ short_id: shortId });
}

export function useUpdateSettings() {
	return api.dashboard.updateSettings.useMutation({
		onError: (error) => {
			toast.error("Something went wrong: " + error.message);
		},
	});
}

export function useAnalytics(shortId: string) {
	return api.dashboard.getAnalytics.useQuery({ short_id: shortId });
}

export function useParticipants(shortId: string) {
	return api.dashboard.getParticipants.useQuery({ short_id: shortId });
}
