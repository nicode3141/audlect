import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function SkeletonSongCard() {

  return (
    <div className='flex bg-[#F0F0F0] p-2.5 rounded-3xl items-center justify-between gap-5 w-[90vw] md:w-2xl'>
        <div className='flex gap-2 items-center flex-1 min-w-0'>
            <SkeletonTheme baseColor="#C2C2C2" highlightColor="#D0D0D0">
                <Skeleton width={'4rem'} height={'4rem'} borderRadius='15px' />

                <div className='flex flex-col leading-tight min-w-0'>
                    <div className='font-montserrat text-[1.15rem] font-semibold truncate'><Skeleton  width={'15rem'} borderRadius='7px'/></div>
                    <div className='font-montserrat text-sm text-gray-600 truncate'><Skeleton  width={'10rem'} borderRadius='7px'/></div>
                </div>
            </SkeletonTheme>
        </div>
    </div>
  )
}