ALTER TABLE "likes" RENAME COLUMN "isrc" TO "song_id";--> statement-breakpoint
ALTER TABLE "songs" DROP CONSTRAINT "songs_isrc_unique";--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_isrc_songs_isrc_fk";
--> statement-breakpoint
ALTER TABLE "likes" ALTER COLUMN "user_id" SET DATA TYPE varchar(255);--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'songs'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "songs" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "songs" ALTER COLUMN "isrc" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "songs" ALTER COLUMN "preview_url" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "songs" ALTER COLUMN "added_by" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "votings" ALTER COLUMN "created_by" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "song_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "deezer_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "song_name" text;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_song_id_songs_song_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("song_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "songs" ADD CONSTRAINT "songs_deezer_id_voting_id_unique" UNIQUE("deezer_id","voting_id");