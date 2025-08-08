import { sql } from "drizzle-orm";
import { boolean, index, pgTable, pgTableCreator, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const votingsTable = pgTable("votings", {
  voting_id: uuid("voting_id").primaryKey().defaultRandom(),
  name: varchar("name", {length: 255}).notNull(), 
  description: text("description").notNull(),
  external_url: varchar("external_url", {length: 255}),
  created_by: uuid("created_by"),
  public: boolean("public").notNull(),
  active: boolean("active").notNull(),
  created_at: timestamp("created_at", {withTimezone: true}).defaultNow()
});

