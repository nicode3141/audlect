import { VotingDetails } from '~/components/page/Header/VotingDetails';
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: 'Audlect Top Songs',
    description: 'Best songs from this month'
}

export default function Voting(){
    return(
        <>
            <VotingDetails></VotingDetails>
        </>
    )
}