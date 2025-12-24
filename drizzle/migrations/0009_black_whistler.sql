CREATE TABLE "likes" (
	"user_id" varchar(255) NOT NULL,
	"song_id" uuid NOT NULL,
	"voting_id" uuid NOT NULL,
	CONSTRAINT "song_user_voting-unique" UNIQUE("song_id","user_id","voting_id")
);
--> statement-breakpoint
CREATE TABLE "songs" (
	"song_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"deezer_id" integer NOT NULL,
	"isrc" varchar(12),
	"voting_id" uuid NOT NULL,
	"cover_image" varchar(255),
	"song_name" text,
	"song_artists" text,
	"preview_url" text,
	"added_by" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "deezer_id_voting_id_unique" UNIQUE("deezer_id","voting_id")
);
--> statement-breakpoint
CREATE TABLE "votings" (
	"voting_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"short_id" varchar(16) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"external_url" varchar(255),
	"created_by" varchar(255),
	"public" boolean NOT NULL,
	"active" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "account" CASCADE;--> statement-breakpoint
DROP TABLE "session" CASCADE;--> statement-breakpoint
DROP TABLE "two_factor" CASCADE;--> statement-breakpoint
DROP TABLE "user" CASCADE;--> statement-breakpoint
DROP TABLE "verification" CASCADE;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_song_id_songs_song_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("song_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_voting_id_votings_voting_id_fk" FOREIGN KEY ("voting_id") REFERENCES "public"."votings"("voting_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "songs" ADD CONSTRAINT "songs_voting_id_votings_voting_id_fk" FOREIGN KEY ("voting_id") REFERENCES "public"."votings"("voting_id") ON DELETE no action ON UPDATE no action;