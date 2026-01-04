ALTER TABLE "voting_memberships" DROP CONSTRAINT "song_user_voting-unique";--> statement-breakpoint
ALTER TABLE "voting_memberships" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "songs" ADD CONSTRAINT "isrc_voting_id_unique" UNIQUE("isrc","voting_id");--> statement-breakpoint
ALTER TABLE "voting_memberships" ADD CONSTRAINT "voting_membership-unique" UNIQUE("user_id","voting_id");