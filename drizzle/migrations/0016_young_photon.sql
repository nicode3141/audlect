ALTER TABLE "linked_spotify" DROP CONSTRAINT "voting-user-unique";--> statement-breakpoint
ALTER TABLE "linked_spotify" DROP CONSTRAINT "linked_spotify_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "linked_spotify" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "linked_spotify" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "linked_spotify" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "linked_spotify" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "linked_spotify" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "linked_spotify" ADD CONSTRAINT "linked_spotify_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linked_spotify" ADD CONSTRAINT "voting-user-unique" UNIQUE("user_id","voting_id");