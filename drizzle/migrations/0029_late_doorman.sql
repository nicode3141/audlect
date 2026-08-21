ALTER TABLE "likes" DROP CONSTRAINT "likes_song_id_songs_song_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_voting_id_votings_voting_id_fk";
--> statement-breakpoint
ALTER TABLE "linked_streaming_services" DROP CONSTRAINT "linked_streaming_services_voting_id_votings_voting_id_fk";
--> statement-breakpoint
ALTER TABLE "songs" DROP CONSTRAINT "songs_voting_id_votings_voting_id_fk";
--> statement-breakpoint
ALTER TABLE "voting_memberships" DROP CONSTRAINT "voting_memberships_voting_id_votings_voting_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_song_id_songs_song_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("song_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_voting_id_votings_voting_id_fk" FOREIGN KEY ("voting_id") REFERENCES "public"."votings"("voting_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linked_streaming_services" ADD CONSTRAINT "linked_streaming_services_voting_id_votings_voting_id_fk" FOREIGN KEY ("voting_id") REFERENCES "public"."votings"("voting_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "songs" ADD CONSTRAINT "songs_voting_id_votings_voting_id_fk" FOREIGN KEY ("voting_id") REFERENCES "public"."votings"("voting_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voting_memberships" ADD CONSTRAINT "voting_memberships_voting_id_votings_voting_id_fk" FOREIGN KEY ("voting_id") REFERENCES "public"."votings"("voting_id") ON DELETE cascade ON UPDATE no action;