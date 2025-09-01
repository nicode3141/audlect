import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import React from 'react'
import { ArrowLeft } from '~/components/icons/Arrows'

interface VotingHeaderProps {
    votingTitle: string
}

export default function VotingHeader({ votingTitle }: VotingHeaderProps) {
  return (
    <div className='self-stretch inline-flex justify-between items-center w-full py-2 px-3'>
        <div className=''>
            {/* IMAGE */}
            <ArrowLeft/>
            <div className='font-montserrat font-bold text-gray-500'>{votingTitle}</div>
        </div>
        <SignedIn>
            <div className=''>
                <UserButton/>
            </div>
        </SignedIn>
        <SignedOut>
            <div className=''></div>
        </SignedOut>
    </div>
  )
}