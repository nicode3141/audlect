ALTER TABLE "linked_spotify" ADD COLUMN "user_id" text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "linked_spotify" ADD CONSTRAINT "linked_spotify_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linked_spotify" ADD CONSTRAINT "voting-user-unique" UNIQUE("user_id","voting_id");