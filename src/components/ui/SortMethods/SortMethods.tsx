"use client";

import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react'
import { DropdownIcon } from '~/components/icons/Arrows'
import { SortIcon } from '~/components/icons/Search'
import type { SortMethodsType } from '~/types/global';

interface SortMethodProps {
    currentSort: SortMethodsType,
    sortOptions: Array<SortMethodsType>
    onChange: (sortMethod: SortMethodsType) => void,
}

export default function SortMethods({
    currentSort,
    sortOptions,
    onChange
}: SortMethodProps) {
    const [dropdownActive, setDropdownActive] = useState<boolean>();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
                setDropdownActive(false);
            }
        }
        document.body.addEventListener('mousedown', closeDropdown);
        return () => document.body.removeEventListener('mousedown', closeDropdown);
    }, []);

    return (
        <div className='relative inline-block' ref={dropdownRef}>
            <button className='flex p-2 rounded-[0.5rem] bg-[#D9D9D9] items-center gap-1 cursor-pointer' onClick={() => setDropdownActive((prev) => !prev)}>
                <SortIcon />
                <span className='font-montserrat font-semibold text-gray-600'>{currentSort}</span>
                <DropdownIcon />
            </button>
            <div className='pt-3'>
                <AnimatePresence>
                    {dropdownActive && sortOptions &&(
                        <motion.ul
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                            }}
                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="absolute left-0 w-40 bg-gray-100 shadow-lg rounded-lg overflow-hidden z-50"
                        >
                            {
                                sortOptions
                                .filter((sort) => sort !== currentSort)
                                .map((item) => (
                                    <li key={item} className='px-3 py-1 cursor-pointer font-montserrat hover:px-4 hover:text-gray-600'
                                        onClick={() => {
                                            onChange(item);
                                            setDropdownActive(false);
                                            window.scrollTo(0, 0);
                                        }}>
                                        {item}
                                    </li>
                                ))
                            }
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}