import { useMemo } from "react"

interface UsePaginationProps {
    totalPages: number,
    currentPage: number,
    siblings?: number
}

export const usePagination = ({
    currentPage, 
    totalPages,
    siblings = 1
}: UsePaginationProps) => {
    return useMemo(() => {
        const totalNumbers = siblings*2 + 5; // FIRST ... SIB1 CURRENT SIB2 ... LAST

        if(totalPages <= totalNumbers - 2) {
            return Array.from({ length: totalPages }, (_, i) => i + 1); // [1, 2, 3, 4, 5] // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }

        const leftSiblingIndex = Math.max(currentPage - siblings, 2); // either 2 or currentPage - siblings -> 9
        const rightSiblingIndex = Math.min(currentPage + siblings, totalPages - 1); // either totalPages -1 or currentPage + siblings -> 9

        const range: (number | string)[] = [1]; // FIRST

        // LEFT
        if(leftSiblingIndex > 2){
            range.push('...');
        }

        //CENTER
        if(rightSiblingIndex >= totalPages - 1){ // left add
            for(let i = totalPages - 3; i < totalPages; i++) range.push(i); // ... 8 9 10 11        
        }
        // right add
        else if(leftSiblingIndex <= 2){ 
            for(let i = 2; i < Math.min(5, totalPages); i++) range.push(i); // 2 3 4
        }
        // sandwich
        else {
            for(let i = leftSiblingIndex; i <= rightSiblingIndex; i++) range.push(i); // SIB1 CURRENT SIB2
        }

        //RIGHT
        if(rightSiblingIndex < totalPages - 1){
            range.push('...');
        }

        range.push(totalPages); // LAST

        return range;
    }, [currentPage, totalPages, siblings])
}