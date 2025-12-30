import { clampInt } from "~/lib/utils";
import type { DeezerSearchResult, DeezerTrack } from "../../types/songs";

const DEEZER_URL = "https://api.deezer.com";

/**
 * @brief Search for songs on deezer API
 *
 * @param search_string string
 * @param limit number
 * @param offset number
 *
 * @return items
 */
export async function searchTrack(
	search_string: string,
	limit: number,
	offset: number,
): Promise<DeezerSearchResult | undefined> {
	const searchParams = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const safeLimit = clampInt(limit, 10, 1, 100);
		const safeOffset = clampInt(offset, 0, 0, 100000);

		const url = new URL("/search", DEEZER_URL);
		url.searchParams.set("q", search_string);
		url.searchParams.set("limit", String(safeLimit));
		url.searchParams.set("index", String(safeOffset));

		const response = await fetch(url.toString(), searchParams);
		if (response.ok) {
			const json = (await response.json()) as DeezerSearchResult;
			return json;
		} else {
			throw new Error("Response error");
		}
	} catch (err) {
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
export async function getTrack(track_id: string): Promise<DeezerTrack | undefined> {
	const searchParams = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const response = await fetch(`https://api.deezer.com/track/${encodeURIComponent(track_id)}`, searchParams);

		if (response.ok) {
			const json = (await response.json()) as DeezerTrack;
			return json;
		} else {
			throw new Error("Response error");
		}
	} catch (err) {
		console.warn(err);
	}
}
