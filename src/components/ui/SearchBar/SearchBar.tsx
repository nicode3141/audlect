"use client";

import React from 'react'
import { useState } from 'react';
import { CloseIcon, SearchIcon } from '~/components/icons/Search'

interface ISearchBarProps {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>,
    placeholder?: string,
    onSubmit: (value: string) => void
}

export default function SearchBar(props: ISearchBarProps) {
    const { inputProps, placeholder, onSubmit } = props;
    const [value, setValue] = useState("");

    const handleSearchReset = () => {
        setValue("");
        onSubmit("");
    }

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit(value);
        }
    }

    return (
        <form className='flex items-center gap-2 rounded-[25px] bg-[#E1E1E1] px-4 py-2 shrink-0 focus-within:outline-2 focus-within:outline-gray-400 w-[90vw] md:w-2xl'>
            <SearchIcon className='w-6 h-6 text-gray-600 shrink-0'/>
            <input className='flex-1 min-w-0 p-1 text-xl font-medium placeholder:font-normal placeholder:text-xl outline-0' 
                type="text" placeholder={placeholder} value={value}
                onChange={(e) => setValue(e.target.value)} onKeyDown={handleSearchKeyDown} {...inputProps}/>
            {value && 
                <button className='shrink-0 cursor-pointer'aria-label='Close' onClick={() => handleSearchReset()}>
                    <CloseIcon className='w-4 h-4'/>
                </button>
            }
        </form>
    )
}