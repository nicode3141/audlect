ALTER TABLE "linked_spotify" ALTER COLUMN "linked_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "linked_spotify" ALTER COLUMN "linked_id" SET DEFAULT gen_random_uuid();