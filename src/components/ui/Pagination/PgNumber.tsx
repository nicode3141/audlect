import React from 'react'

interface PGNumberProps {
    number: number,
    isActive: boolean,
    key: string,
    gotoPage: (page: number) => void
}

export default function PGNumber({
    number,
    isActive,
    gotoPage,
    key
}: PGNumberProps) {
  return (
    <button key={key} 
            className={`${isActive ? 'text-[#0DA955]' : 'text-gray-900'} font-montserrat text-xl font-semibold cursor-pointer`} 
            onClick={() => gotoPage(number)}>
                {number}
    </button>
  )
}