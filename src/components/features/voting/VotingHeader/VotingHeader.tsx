"use client";

import { SignedIn, SignedOut, SignInButton, useClerk, UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'
import { ArrowDown, ArrowLeft } from '~/components/icons/Arrows'

interface VotingHeaderProps {
    votingTitle: string,
    onBackClick: () => void,
}

export default function VotingHeader({ votingTitle, onBackClick }: VotingHeaderProps) {
    const { openUserProfile } = useClerk();

    return (
    <div className='self-stretch inline-flex justify-between items-center w-full py-2 px-3'>
        <Link className='flex gap-4 items-center' href={'/'} onClick={onBackClick}>
            <ArrowLeft/>
            <div className='font-montserrat font-bold text-gray-500 text-lg'>{votingTitle}</div>
        </Link>
        <SignedIn>
            <div className='flex items-center gap-3 cursor-pointer'>
                <button onClick={() =>  openUserProfile()} aria-label='user-menu'>
                    <ArrowDown/>
                </button>
                <UserButton/>
            </div>
        </SignedIn>
        <SignedOut>
            <SignInButton>
                <span className='font-montserrat text-lg text-[#242424] font-bold underline cursor-pointer select-none'>Sign In</span>
            </SignInButton>
        </SignedOut>
    </div>
  )
}