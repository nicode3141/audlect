"use client";

import { api } from "~/trpc/react";
import type { BrowseSortOptions } from "~/features/voting/components/BrowseSearch";

interface UsePublicVotingsProps {
	limit?: number;
	sort_method: BrowseSortOptions;
}

export function usePublicVotings({ limit = 20, sort_method }: UsePublicVotingsProps) {
	return api.votings.getPublicVotings.useInfiniteQuery(
		{ limit, sort_method },
		{
			staleTime: 1000,
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		},
	);
}
