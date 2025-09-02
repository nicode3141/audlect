"use client";

import React from 'react'
import { useState } from 'react';
import { CloseIcon, SearchIcon } from '~/components/icons/Search'

interface SearchBarProps {
    placeholder?: string
    onSubmit: (value: string) => void;
}

export default function SearchBar({ placeholder, onSubmit }: SearchBarProps) {
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
        <div className='flex items-center gap-2 rounded-[20px] bg-[#E1E1E1] px-4 py-2 shrink-0'>
            <SearchIcon/>
            <input className='p-1 text-xl font-medium placeholder:font-normal placeholder:text-xl outline-0' 
                type="text" placeholder={placeholder} value={value}
                onChange={(e) => setValue(e.target.value)} onKeyDown={handleSearchKeyDown}/>
                {value && 
                    <button className='cursor-pointer' onClick={() => handleSearchReset()}>
                        <CloseIcon/>
                    </button>
                }
        </div>
    )
}