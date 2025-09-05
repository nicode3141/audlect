import { test, expect } from '@jest/globals';
import { getTrack, searchTrack } from '~/server/utils/deezer';
import { createAuthContextInner } from './authContext';
import { appRouter } from '~/server/api/root';

async function getCaller() {
	const context = await createAuthContextInner({});
	return appRouter.createCaller(context);
}

jest.mock('@clerk/nextjs/server', () => ({
	auth: jest.fn(() => ({
		userId: 'test-user-id',
		sessionId: 'test-session-id',
	})),
}));

test('search-test', async () => {
	const searchOutput = await searchTrack('Waterfalls', 10, 0);
	console.log(searchOutput);
	console.log(searchOutput?.data[0]?.title);

	expect(searchOutput?.data[0]?.title).toBeDefined();
});

test('track-test Metadata', async () => {
	const searchOutput = await getTrack('3487048191');

	console.log(searchOutput?.artist.name);

	expect(searchOutput?.artist.name).toBe('James Hype');
});

test('search track', async () => {
	const caller = await getCaller();
	const result = await caller.deezerSearch.searchString({
		search_string: 'Cool',
		limit: 10,
		offset: 0,
	});
	expect(result).toBeDefined();
});
