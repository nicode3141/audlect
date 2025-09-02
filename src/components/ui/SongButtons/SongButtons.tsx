import React from 'react'
import { motion } from "motion/react"
import { LikeIcon } from '~/components/icons/Song'

interface LikeButtonProps {
    liked: boolean,
    handleLike: () => void,
    isLoadingLike: boolean
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
                disabled={isLoadingLike}>
                    <LikeIcon liked={liked}></LikeIcon>
            </motion.button>
        
    )
}