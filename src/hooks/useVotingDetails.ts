'use client';

import { api } from '~/trpc/react';

export function useVotingDetails(voting_id: string) {
	return api.votings.votings.useQuery({ voting_id });
}
