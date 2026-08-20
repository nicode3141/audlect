"use client";

import { api } from "~/trpc/react";
import type { BrowseSortOptions } from "~/features/voting/components/BrowseSearch";

interface UseSearchPublicVotingsProps {
	search_string: string;
	limit?: number;
	sort_method: BrowseSortOptions;
	enabled?: boolean;
}

export function useSearchPublicVotings({
	search_string,
	limit = 20,
	sort_method,
	enabled = true,
}: UseSearchPublicVotingsProps) {
	return api.search.searchPublicVotings.useInfiniteQuery(
		{ search_string, limit, sort_method },
		{
			staleTime: 1000,
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			enabled,
		},
	);
}
