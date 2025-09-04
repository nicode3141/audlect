import React from 'react'

interface VotingTitleProps {
    children?: React.ReactNode
}

export function VotingTitle({ children }: VotingTitleProps) {
  return (
    <div className={`heading1 text-center font-bold lg:text-6xl text-4xl text-[#898989] font-inter`}>{children}</div>
  )
}

export function VotingSubitle({ children }: VotingTitleProps) {
  return (
    <div className={`heading2small text-center font-medium lg:text-3xl text-2xl text-[#B5B5B5] text-shadow-2xs font-inter`}>{children}</div>
  )
}
