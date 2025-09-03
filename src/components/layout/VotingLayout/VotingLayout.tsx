"use client";

import { useClerk } from '@clerk/nextjs'
import React from 'react'
import VotingHeader from '~/components/features/voting/VotingHeader/VotingHeader'
import { VotingDetails } from '../VotingDetails/VotingDetails'

export default function VotingLayout() {
  const { openUserProfile } = useClerk()

  return (
    <>
      <VotingHeader votingTitle='Audlect Top Songs' onBackClick={() => {console.log("test")}} onUserClick={() => openUserProfile()}/>
      <VotingDetails/>
    </>
  )
}
