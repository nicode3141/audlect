export type DeezerArtist = {
  id: number;
  name: string;
};

export type DeezerAlbum = {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
};

export type DeezerTrack = {
  id: number;
  isrc: string;
  link: string;
  title: string;
  title_short: string;
  artist: DeezerArtist;
  preview: string;
  type: string;
  album: DeezerAlbum;
};

export type DeezerTrackResponse = {
  data: DeezerTrack;
};

export type DeezerSearchResult = {
  data: DeezerTrack[];
};

export type TSongMetadata = {
  song_id?: string;
  deezer_id: string;
  isrc?: string;
  voting_id: string;
  song_name: string;
  song_artists: string;
  cover_image?: string;
  preview_url?: string;
  added_by?: string;
  created_at?: Date;
  likes_total?: number;
  liked?: unknown;
};
