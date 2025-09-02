"use client";

import { ClerkProvider, useClerk } from '@clerk/nextjs'
import React from 'react'
import VotingHeader from '~/components/features/voting/VotingHeader/VotingHeader'
import { VotingDetails } from '../VotingDetails/VotingDetails'
import SearchBar from '~/components/ui/SearchBar/SearchBar';

export default function VotingLayout() {
  const { openUserProfile } = useClerk()

  return (
    <>
      <VotingHeader votingTitle='Audlect Top Songs' onBackClick={() => {console.log("test")}} onUserClick={() => openUserProfile()}/>
      <VotingDetails/>
    </>
  )
}
