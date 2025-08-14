
/**
 * @brief Search for songs on deezer API
 * 
 * @param search_string string
 * @param limit number
 * @param offset number
 * 
 * @return items
 */
export async function searchTrack(search_string:string, limit:number, offset:number){
    var searchParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }

    const response = await fetch(`https://api.deezer.com/search?q=${search_string}&limit=${limit}&page=${offset}`, searchParams);

    return response.json();
}

/**
 * @brief GET a track with metadata by its id
 * 
 * @param track_id string
 * 
 * @return item
 */
export async function getTrack(track_id:string){
    var searchParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }

    const response = await fetch(`https://api.deezer.com/track/${track_id}`, searchParams);

    return response.json();
}