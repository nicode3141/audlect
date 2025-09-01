import { VotingDetails } from '~/components/layout/VotingDetails/VotingDetails';
import { ClerkProvider } from '@clerk/nextjs'
import { type Metadata } from "next";
import VotingHeader from '~/components/features/voting/VotingHeader/VotingHeader';


export const metadata: Metadata = {
    title: 'Audlect Top Songs',
    description: 'Best songs from this month'
}

export default function Voting(){
    return(
        <ClerkProvider>
            <VotingHeader votingTitle='TestTitle'/>
            <VotingDetails/>
        </ClerkProvider>
    )
}