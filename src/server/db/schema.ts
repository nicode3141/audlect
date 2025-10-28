import { boolean, integer, pgTable, text, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";

export const votingsTable = pgTable("votings", {
	voting_id: uuid("voting_id").primaryKey().defaultRandom(),
	short_id: varchar("short_id", { length: 16 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description").notNull(),
	external_url: varchar("external_url", { length: 255 }),
	created_by: varchar("created_by", { length: 255 }), //owner (clerk)
	public: boolean("public").notNull(),
	active: boolean("active").notNull(),
	created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const songsTable = pgTable(
	"songs",
	{
		song_id: uuid("song_id").primaryKey().defaultRandom(),
		deezer_id: integer("deezer_id").notNull(),
		isrc: varchar("isrc", { length: 12 }), //isrc from music api
		voting_id: uuid("voting_id")
			.notNull()
			.references(() => votingsTable.voting_id),
		cover_image: varchar("cover_image", { length: 255 }),
		song_name: text("song_name"),
		song_artists: text("song_artists"),
		preview_url: text("preview_url"),
		added_by: varchar("added_by", { length: 255 }).notNull(), //clerk
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
	},
	(t) => [unique("deezer_id_voting_id_unique").on(t.deezer_id, t.voting_id)],
);

export const likesTable = pgTable(
	"likes",
	{
		user_id: varchar("user_id", { length: 255 }).notNull(), //clerk
		song_id: uuid("song_id")
			.notNull()
			.references(() => songsTable.song_id),
		voting_id: uuid("voting_id")
			.notNull()
			.references(() => votingsTable.voting_id),
	},
	(t) => [unique("song_user_voting-unique").on(t.song_id, t.user_id, t.voting_id)],
);

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});
