import React from 'react'
import { BackArrow, ForwardArrow } from '~/components/icons/Arrows'
import PGNumber from './PGNumber'
import { usePagination } from '~/hooks/usePagination'

interface PaginationProps {
  totalPages: number,
  currentPage: number,
  gotoPage: (page: number) => void
}

export default function Pagination({
  totalPages,
  currentPage,
  gotoPage
}: PaginationProps) {

  const centerPageElements = usePagination({totalPages, currentPage});
  console.log({centerPageElements});
  return (
    <div className='flex items-center justify-center gap-4 px-3 py-2 bg-[#54B88636] rounded-[2.5rem] select-none'>
      <button className={`${currentPage === 1 ? 'invert-50': 'cursor-pointer'}`} 
              aria-label='back-button'
              onClick={() => currentPage > 1 && gotoPage(currentPage-1)}
              disabled={currentPage === 1}>
        <BackArrow />
      </button>
      <div className='flex gap-2 items-center'>
        {
          centerPageElements.map((page, index) => 
            page === '...' ? (
                <span key={index} className='font-montserrat text-xl font-semibold'>...</span>
            ) : (
              <PGNumber number={Number(page)} key={String(index)} isActive={page === currentPage} gotoPage={gotoPage}/>
            ))
        }          
      </div>
      <button className={`${currentPage >= totalPages ? 'invert-50': 'cursor-pointer'}`} 
              aria-label='forward-button'
              onClick={() => currentPage < totalPages && gotoPage(currentPage+1)}
              disabled={currentPage >= totalPages}>
        <ForwardArrow />
      </button>
    </div>
  )
}