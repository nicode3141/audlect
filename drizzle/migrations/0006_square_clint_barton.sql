ALTER TABLE "votings" ADD COLUMN "short_id" varchar(16) NOT NULL;--> statement-breakpoint
ALTER TABLE "votings" ADD CONSTRAINT "votings_short_id_unique" UNIQUE("short_id");