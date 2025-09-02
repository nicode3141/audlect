import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import VotingLayout from "~/components/layout/VotingLayout/VotingLayout";

export const metadata: Metadata = {
    title: 'Audlect Top Songs',
    description: 'Best songs from this month'
}

export default function Voting(){
    return(
        <ClerkProvider>
            <VotingLayout/>
        </ClerkProvider>
    )
}