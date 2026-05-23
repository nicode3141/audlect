"use client";

import { api } from "~/trpc/react";

export function useDashboardSettings(voting_id: string) {
	return api.dashboard.getSettings.useQuery({ voting_id });
}

export function useUpdateSettings() {
	return api.dashboard.updateSettings.useMutation();
}

export function useAnalytics(voting_id: string) {
	return api.dashboard.getAnalytics.useQuery({ voting_id });
}
