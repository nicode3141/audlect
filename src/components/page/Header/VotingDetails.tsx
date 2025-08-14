"use client"

import { api } from "~/trpc/react";
export function VotingDetails(){
    const { data, isLoading, error } = api.votings.votings.useQuery({ voting_id: "5b0c7148-90cc-4b8f-83a1-dea74841939d"});

    return(
        <div className={`VotingDetails font-inter`}>
            <div className={`heading1 text-center mt-24 font-bold text-6xl text-gray-500 font-inter`}>{isLoading ? "Loading..." : data?.name}</div>
            <div className={`heading2small text-center font-medium text-3xl text-gray-400 text-shadow-2xs font-inter`}>{isLoading ? "Loading..." : data?.description}</div>
        </div>
    )
}