import { test, expect } from "@jest/globals"
import { getTrack, searchTrack } from "~/server/utils/deezer";


test("search-test", async () => {
    const searchOutput = await searchTrack("Waterfalls", 10, 0);

    console.log(searchOutput.data[0].title);

    expect(searchOutput.data[0].title).toBeDefined();
})

test("track-test Metadata", async () => {
    const searchOutput = await getTrack("3487048191");

    console.log(searchOutput.artist.name);

    expect(searchOutput.artist.name).toBe("James Hype");
})