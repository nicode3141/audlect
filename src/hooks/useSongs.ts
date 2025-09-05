"use client";

import { api } from "~/trpc/react";
import type { SortMethodsType } from "~/types/global";

interface ISongQueryProps {
	limit: number;
	offset: number;
	sort_method: SortMethodsType;
	voting_id: string;
}

export function useSongs({
	limit,
	offset,
	sort_method,
	voting_id,
}: ISongQueryProps) {
	return api.songs.songs.useQuery(
		{ limit, offset, sort_method, voting_id },
		{
			staleTime: 30_000,
		},
	);
}
