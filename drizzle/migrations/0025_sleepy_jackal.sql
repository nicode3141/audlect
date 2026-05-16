ALTER TABLE "votings" ADD COLUMN "starts_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "votings" ADD COLUMN "ends_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "songs" ADD CONSTRAINT "isrc_voting_id_unique" UNIQUE("isrc","voting_id");