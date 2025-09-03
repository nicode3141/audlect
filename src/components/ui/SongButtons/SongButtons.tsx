import React from 'react'
import { motion } from "motion/react"
import { LikeIcon, PlusIcon } from '~/components/icons/Song'

interface LikeButtonProps {
    liked: boolean,
    handleLike: () => void,
    isLoadingLike?: boolean
}

interface AddSongButtonProps {
    added: boolean,
    handleAdd: () => void,
    isLoadingAdd: boolean
}

export function LikeButton({ liked, handleLike, isLoadingLike }: LikeButtonProps) {
    return (
        
            <motion.button className='cursor-pointer' 
                initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{  type: 'spring', duration: 0.8, bounce: .4 }} 
                whileTap={{ scale: 2 }}
                onClick={() => {
                    handleLike()
                }} 
                aria-label='like-button'
                disabled={isLoadingLike}>
                    <LikeIcon liked={liked}></LikeIcon>
            </motion.button>
        
    )
}

export function AddSongButton({ added, handleAdd, isLoadingAdd }: AddSongButtonProps) {
    return (
        <motion.button className='bg-gray-300 rounded-full p-3 cursor-pointer' 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{  type: 'tween', duration: 0.45, bounce: 0.51 }} 
            whileTap={{ scale: 2 }}
            onClick={() => {
                handleAdd()
            }} 
            aria-label='add-song-button'
            disabled={isLoadingAdd}>
                <PlusIcon added={added}></PlusIcon>
        </motion.button>
    )
}