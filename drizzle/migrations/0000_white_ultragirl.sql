CREATE TABLE "likes" (
	"user_id" uuid NOT NULL,
	"isrc" varchar NOT NULL,
	"voting_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "songs" (
	"isrc" varchar(12) PRIMARY KEY NOT NULL,
	"voting_id" uuid NOT NULL,
	"cover_image" varchar(255),
	"song_artists" text,
	"preview_url" varchar,
	"added_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "songs_isrc_unique" UNIQUE("isrc")
);
--> statement-breakpoint
CREATE TABLE "votings" (
	"voting_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"external_url" varchar(255),
	"created_by" uuid,
	"public" boolean NOT NULL,
	"active" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_isrc_songs_isrc_fk" FOREIGN KEY ("isrc") REFERENCES "public"."songs"("isrc") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_voting_id_votings_voting_id_fk" FOREIGN KEY ("voting_id") REFERENCES "public"."votings"("voting_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "songs" ADD CONSTRAINT "songs_voting_id_votings_voting_id_fk" FOREIGN KEY ("voting_id") REFERENCES "public"."votings"("voting_id") ON DELETE no action ON UPDATE no action;