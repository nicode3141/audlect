"use client"

import {Inter, Montserrat} from "next/font/google";
import { api } from "~/trpc/react";

const inter = Inter({
  subsets: ['latin'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
})


export function VotingDetails(){
    const { data, isLoading, error } = api.voting.votings.useQuery();
    console.log(data);

  

    return(
        <div className={`VotingDetails ${inter.className}`}>
            <div className={`heading1 text-center mt-24 font-bold text-6xl text-gray-500`}>{isLoading ? "Loading..." : data?.name}</div>
            <div className={`heading2small text-center font-medium text-3xl text-gray-400 text-shadow-2xs`}>{isLoading ? "Loading..." : data?.description}</div>
            <div className={`DatabaseContent`}>{data?.created_at?.toDateString()}</div>
        </div>
    )
}