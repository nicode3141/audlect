ALTER TABLE "votings" RENAME COLUMN "filter_inappropiate" TO "filter_inappropriate";--> statement-breakpoint
ALTER TABLE "votings" ADD COLUMN "song_approval" boolean DEFAULT false NOT NULL;