import React, { useEffect, useState } from 'react'
import SongCard from './SongCard'
import type { TSongMetadata } from '~/types/songs'
import { api, type RouterOutputs } from '~/trpc/react';
import { nop } from '~/lib/utils';

type Song = RouterOutputs["likes"]["like"];

interface ISongCardContainerProps {
    metadata: TSongMetadata,
    variant: "playlist" | "search",
}

export default function SongCardContainer(props: ISongCardContainerProps) {
    const { metadata, variant } = props;

    const [likes, setLikes] = useState<number>(metadata.likes_total);
    const [liked, setLiked] = useState<boolean>(metadata.liked as boolean);
    const [loadingLike, setIsLoadingLike] = useState<boolean>(false);

    useEffect(() => {
        setLiked(metadata.liked as boolean);
    }, [metadata.likes_total]);

    const likeMutation = api.likes.like.useMutation({
        onMutate: (vars) => {
            const likesBefore = likes;
            setLiked(true);
            setLikes((prev) => prev + 1);
            setIsLoadingLike(true);

            return { likesBefore };
        },
        onError: (err, vars, ctx) => {
            setLiked(false);
            setLikes(ctx?.likesBefore ?? likes);
            setIsLoadingLike(false);
        },
        onSettled: (data, err, vars, ctx) => {
            if(data?.likes_total === undefined || data?.liked === undefined){
                setLiked(false);
                setLikes(ctx?.likesBefore ?? likes);
                setIsLoadingLike(false);
                return;
            }

            setLikes(data?.likes_total);
            setLiked(data?.liked as boolean);
            setIsLoadingLike(false);
        }
    });

    const unlikeMutation = api.likes.unlike.useMutation({
        onMutate: () => {
            const likesBefore = likes;
            setLiked(false);
            setLikes((prev) => prev - 1);
            setIsLoadingLike(true);

            return {likesBefore};
        },
        onError: (err, vars, ctx) => {
            setLiked(false);
            setLikes(ctx?.likesBefore ?? likes);
            setIsLoadingLike(false);
        },
        onSettled: (data, err, vars, ctx) => {
            if(data?.likes_total === undefined || data?.liked === undefined){
                setLiked(false);
                setLikes(ctx?.likesBefore ?? likes);
                setIsLoadingLike(false);
                return;
            }

            setLikes(data?.likes_total);
            setLiked(data?.liked as boolean);
            setIsLoadingLike(false);
        }
    })

    return (
        <SongCard
            metadata={{...metadata, likes_total: likes, liked: liked}}
            liked={liked}
            added={variant !== "search"}
            addedSearchResult={false}
            onLike={() =>
                liked ? 
                    unlikeMutation.mutate({ song_id: metadata.song_id, voting_id: metadata.voting_id }) : 
                    likeMutation.mutate({ song_id: metadata.song_id, voting_id: metadata.voting_id })
            }
            onAdd={() => nop()}
            onMore={() => nop()}
            isLoadingLike={loadingLike}
            isLoadingAdd={false}/>
    )
}