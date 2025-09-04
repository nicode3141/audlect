"use client";

import React from 'react'
import { VotingDetails } from '../VotingDetails/VotingDetails'
import SearchBar from '~/components/ui/SearchBar/SearchBar';
import { nop } from '~/lib/utils';
import SortMethods from '~/components/ui/SortMethods/SortMethods';
import type { SortMethodsType } from '~/types/global';
import SongCard from '~/components/features/voting/SongCard/SongCard';
import { useSongs } from '~/hooks/useSongs';

export default function VotingLayout() {
  
  const { data, isLoading, error } = useSongs({ limit:10, offset:0, sort_method:"Likes", voting_id:"5b0c7148-90cc-4b8f-83a1-dea74841939d"});

  return (
    <>
      <VotingDetails/>
      <div className='flex items-center justify-center flex-col gap-2 p-5'>
        <SearchBar onSubmit={() => nop()} placeholder='Search by Song, Artist'/>
        <SortMethods className='w-[80vw]' currentSort={'Likes'} sortOptions={["A-Z"]} 
            onChange={
              function (sortMethod: SortMethodsType): void {
                throw new Error('Function not implemented.');
            }} 
        />
      </div>
      <div className='flex items-center justify-center flex-col gap-3.5'>
        {
          //move to seperate component
          data?.map((items) => (
            <SongCard key={items.isrc} metadata={{
            song_id: '',
            deezer_id: '',
            isrc: '',
            voting_id: '',
            song_name: items.song_name ?? "Loading",
            song_artists: 'Imagine Dragons',
            cover_image: items.cover_image ?? "",
            preview_url: '',
            added_by: '',
            created_at: new Date(),
            likes_total: items.likes_total,
            liked: items.liked
          }} added={true} />
          ))
        }
      </div>
    </>
  )
}