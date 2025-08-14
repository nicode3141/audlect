import { sql } from "drizzle-orm";
import { boolean, index, pgTable, pgTableCreator, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const votingsTable = pgTable("votings", {
  voting_id: uuid("voting_id").primaryKey().defaultRandom(),
  name: varchar("name", {length: 255}).notNull(),
  description: text("description").notNull(),
  external_url: varchar("external_url", {length: 255}),
  created_by: varchar("created_by", {length: 255}), //owner (clerk)
  public: boolean("public").notNull(),
  active: boolean("active").notNull(),
  created_at: timestamp("created_at", {withTimezone: true}).defaultNow()
});

export const songsTable = pgTable("songs", {
  isrc: varchar("isrc", { length: 12 }).primaryKey().unique(), //isrc from music api
  voting_id: uuid("voting_id").notNull().references(() => votingsTable.voting_id),
  cover_image: varchar("cover_image", { length: 255 }),
  song_artists: text("song_artists"),
  preview_url: varchar("preview_url", {length: 255}),
  added_by: varchar("added_by", {length: 255}).notNull(), //clerk
  created_at: timestamp("created_at", {withTimezone: true}).defaultNow()
});

export const likesTable = pgTable("likes", {
  user_id: varchar("user_id", {length: 255}).notNull(), //clerk
  isrc: varchar("isrc", {length: 12}).notNull().references(() => songsTable.isrc),
  voting_id: uuid("voting_id").notNull().references(() => votingsTable.voting_id)
});