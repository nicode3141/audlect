ALTER TABLE "linked_spotify" RENAME TO "linked_streaming_services";--> statement-breakpoint
ALTER TABLE "linked_streaming_services" DROP CONSTRAINT "linked_spotify_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "linked_streaming_services" DROP CONSTRAINT "linked_spotify_voting_id_votings_voting_id_fk";
--> statement-breakpoint
ALTER TABLE "linked_streaming_services" ADD CONSTRAINT "linked_streaming_services_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linked_streaming_services" ADD CONSTRAINT "linked_streaming_services_voting_id_votings_voting_id_fk" FOREIGN KEY ("voting_id") REFERENCES "public"."votings"("voting_id") ON DELETE no action ON UPDATE no action;