import React from 'react'

interface VotingTitleProps {
    children?: React.ReactNode
}

export function VotingTitle({ children }: VotingTitleProps) {
  return (
    <div className={`heading1 text-center mt-24 font-bold lg:text-6xl text-4xl text-gray-500 font-inter`}>{children}</div>
  )
}

export function VotingSubitle({ children }: VotingTitleProps) {
  return (
    <div className={`heading2small text-center font-medium lg:text-3xl text-2xl text-gray-400 text-shadow-2xs font-inter`}>{children}</div>
  )
}
