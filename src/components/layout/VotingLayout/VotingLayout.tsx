'use client';

import React from 'react';
import { VotingDetails } from '../VotingDetails/VotingDetails';
import SearchBar from '~/components/ui/SearchBar/SearchBar';
import { nop } from '~/lib/utils';
import SortMethods from '~/components/ui/SortMethods/SortMethods';
import type { SortMethodsType } from '~/types/global';
import SongCard from '~/components/features/voting/SongCard/SongCard';
import { useSongs } from '~/hooks/useSongs';
import PlaylistItems from '~/components/features/voting/PlaylistItems/PlaylistItems';
import Pagination from '~/components/ui/Pagination/Pagination';

export default function VotingLayout() {
	return (
		<>
			<VotingDetails />
			<div className="flex flex-col items-center justify-center gap-2 p-5">
				<SearchBar
					onSubmit={() => nop()}
					placeholder="Search by Song, Artist"
				/>
				<SortMethods
					className="w-[80vw] lg:w-[40rem]"
					currentSort={'Likes'}
					sortOptions={['A-Z', 'Date Added']}
					onChange={function (sortMethod: SortMethodsType): void {
						throw new Error('Function not implemented.');
					}}
				/>
			</div>
			<PlaylistItems voting_id="5b0c7148-90cc-4b8f-83a1-dea74841939d" />
			<div className="flex items-center justify-center p-10">
				<Pagination
					variant={'default'}
					totalPages={10}
					currentPage={1}
					gotoPage={function (page: number): void {
						throw new Error('Function not implemented.');
					}}
				/>
			</div>
		</>
	);
}
