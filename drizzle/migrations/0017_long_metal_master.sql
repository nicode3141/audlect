ALTER TABLE "linked_spotify" RENAME COLUMN "id" TO "linked_id";--> statement-breakpoint
ALTER TABLE "linked_spotify" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
ALTER TABLE "linked_spotify" ALTER COLUMN "user_id" SET NOT NULL;