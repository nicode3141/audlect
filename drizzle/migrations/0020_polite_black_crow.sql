ALTER TABLE "linked_spotify" DROP CONSTRAINT "linked_spotify_user_id_user_id_fk";
--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'linked_spotify'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "linked_spotify" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "linked_spotify" ALTER COLUMN "user_id" DROP NOT NULL;