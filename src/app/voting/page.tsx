import { VotingDetails } from '~/components/page/Header/VotingDetails';
import { ClerkProvider } from '@clerk/nextjs'
import { type Metadata } from "next";
import AccountHeader from '~/components/page/Header/AccountHeader';
import SearchBar from '~/components/page/Header/SearchBar';


export const metadata: Metadata = {
    title: 'Audlect Top Songs',
    description: 'Best songs from this month'
}

export default function Voting(){
    return(
        <ClerkProvider>
            <AccountHeader></AccountHeader>
            <VotingDetails></VotingDetails>
            <SearchBar></SearchBar>
        </ClerkProvider>
    )
}