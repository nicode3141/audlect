import type { DeezerSearchResult, DeezerTrack } from "../types/deezer";

/**
 * @brief Search for songs on deezer API
 * 
 * @param search_string string
 * @param limit number
 * @param offset number
 * 
 * @return items
 */
export async function searchTrack(search_string:string, limit:number, offset:number): Promise<DeezerSearchResult | undefined>{
    const searchParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    try{
      const response = await fetch(`https://api.deezer.com/search?q=${search_string}&limit=${limit}&page=${offset}`, searchParams);
      if(response.ok){
        const json = await response.json() as DeezerSearchResult ;
        return json;
      } else{
        throw new Error('Response error');
      }
    } catch(err){
      console.warn(err);
    }
}

/**
 * @brief GET a track with metadata by its id
 * 
 * @param track_id string
 * 
 * @return item
 */
export async function getTrack(track_id:string): Promise<DeezerTrack | undefined>{
    const searchParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    try{
      const response = await fetch(`https://api.deezer.com/track/${track_id}`, searchParams);
      
      if(response.ok){
        const json = await response.json() as DeezerTrack;
        return json;

      } else{
        throw new Error('Response error');
      }

    } catch(err){
      console.warn(err);
    }
}