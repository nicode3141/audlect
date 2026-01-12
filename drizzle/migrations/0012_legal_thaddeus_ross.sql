CREATE TABLE "linked_spotify" (
	"id" text PRIMARY KEY NOT NULL,
	"refresh_token" text,
	"playlist_url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "voting_memberships" DROP CONSTRAINT "song_user_voting-unique";--> statement-breakpoint
ALTER TABLE "voting_memberships" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "voting_memberships" ADD CONSTRAINT "voting_membership-unique" UNIQUE("user_id","voting_id");