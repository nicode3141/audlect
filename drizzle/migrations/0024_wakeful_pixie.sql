CREATE TABLE "linked_spotify" (
	"linked_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text,
	"voting_id" uuid NOT NULL,
	"refresh_token" text,
	"playlist_url" text NOT NULL,
	CONSTRAINT "voting-user-unique" UNIQUE("user_id","voting_id")
);
--> statement-breakpoint
ALTER TABLE "linked_spotify" ADD CONSTRAINT "linked_spotify_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linked_spotify" ADD CONSTRAINT "linked_spotify_voting_id_votings_voting_id_fk" FOREIGN KEY ("voting_id") REFERENCES "public"."votings"("voting_id") ON DELETE no action ON UPDATE no action;