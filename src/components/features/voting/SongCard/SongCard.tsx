import Image from 'next/image';
import React from 'react'
import { AddSongButton, LikeButton } from '~/components/ui/SongButtons/SongButtons';
import MoreIcon from '~/components/icons/MoreIcon';
import { nop } from '~/lib/utils';
import type { TSongMetadata } from '~/types/songs';

interface SongCardProps {
    metadata: TSongMetadata
    added: boolean,
    addedSearchResult?: boolean,
    liked?: boolean,
    onLike?: () => void,
    onMore?: () => void,
    onAdd?: () => void,
    isLoadingLike?: boolean,
    isLoadingAdd?: boolean
}

export default function SongCard({ 
        metadata,
        added,
        addedSearchResult,
        liked,
        onLike,
        onMore,
        onAdd,
        isLoadingLike,
        isLoadingAdd
    }: SongCardProps) {
  return (
    <div className='flex bg-[#F0F0F0] p-2.5 rounded-3xl items-center justify-between gap-5 w-[90vw] md:w-2xl'>
        <div className='flex gap-2 items-center flex-1 min-w-0'>
            <Image
                src={metadata.cover_image ?? ""}
                alt={metadata.song_name}
                width={90}
                height={90}
                className="w-16 h-16 rounded-xl"
                />
            <div className='flex flex-col leading-tight min-w-0'>
                <div className='font-montserrat text-[1.15rem] font-semibold truncate'>{metadata.song_name}</div>
                <div className='font-montserrat text-sm text-gray-600 truncate'>{metadata.song_artists}</div>
            </div>
        </div>
        <div className='flex justify-between items-center p-2 gap-4'>
            {
                added ? (
                    <>
                        <div className='flex flex-col gap-1'>
                            <LikeButton liked={liked ?? false} isLoadingLike={isLoadingLike ?? false} handleLike={onLike ?? nop}></LikeButton>
                            <div className='text-center text-sm text-gray-700 select-none'>{metadata.likes_total}</div>
                        </div>
                        <button className='cursor-pointer' aria-label='more-info' onClick={onMore ?? nop}>
                            <MoreIcon/>
                        </button>
                    </>
                ) : (
                    <AddSongButton added={addedSearchResult ?? false} isLoadingAdd={isLoadingAdd ?? false} handleAdd={onAdd ?? nop}></AddSongButton>
                )
            }

        </div>
    </div>
  )
}