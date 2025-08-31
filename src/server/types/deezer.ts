export type DeezerArtist = {
    id: number,
    name: string
}

export type DeezerAlbum = {
    id: number,
    title: string,
    cover: string,
    cover_small: string,
    cover_medium: string,
    cover_big: string,
}

export type DeezerTrack = {
    id: string,
    isrc: string,
    link: string,
    title: string,
    title_short: string,
    artist: DeezerArtist,
    preview: string,
    type: string
}

export type DeezerTrackResponse = {
    data: DeezerTrack
}

export type DeezerSearchResult = {
    
}