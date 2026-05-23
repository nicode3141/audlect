ALTER TABLE "votings" ALTER COLUMN "starts_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "votings" ADD COLUMN "max_votes_user" integer;--> statement-breakpoint
ALTER TABLE "votings" ADD COLUMN "max_songs_user" integer;--> statement-breakpoint
ALTER TABLE "votings" ADD COLUMN "max_votes_del" integer;--> statement-breakpoint
ALTER TABLE "votings" ADD COLUMN "filter_inappropiate" boolean DEFAULT false NOT NULL;