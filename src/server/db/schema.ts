import {
	boolean,
	index,
	pgTable,
	pgTableCreator,
	text,
	timestamp,
	unique,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';

export const votingsTable = pgTable('votings', {
	voting_id: uuid('voting_id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }).notNull(),
	description: text('description').notNull(),
	external_url: varchar('external_url', { length: 255 }),
	created_by: varchar('created_by', { length: 255 }), //owner (clerk)
	public: boolean('public').notNull(),
	active: boolean('active').notNull(),
	created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const songsTable = pgTable(
	'songs',
	{
		song_id: uuid('song_id').primaryKey().defaultRandom(),
		deezer_id: varchar('deezer_id').notNull(),
		isrc: varchar('isrc', { length: 12 }), //isrc from music api
		voting_id: uuid('voting_id')
			.notNull()
			.references(() => votingsTable.voting_id),
		cover_image: varchar('cover_image', { length: 255 }),
		song_name: text('song_name'),
		song_artists: text('song_artists'),
		preview_url: text('preview_url'),
		added_by: varchar('added_by', { length: 255 }).notNull(), //clerk
		created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
	},
	(t) => [unique('deezer_id_voting_id_unique').on(t.deezer_id, t.voting_id)],
);

export const likesTable = pgTable(
	'likes',
	{
		user_id: varchar('user_id', { length: 255 }).notNull(), //clerk
		song_id: uuid('song_id')
			.notNull()
			.references(() => songsTable.song_id),
		voting_id: uuid('voting_id')
			.notNull()
			.references(() => votingsTable.voting_id),
	},
	(t) => [
		unique('song_user_voting-unique').on(t.song_id, t.user_id, t.voting_id),
	],
);
