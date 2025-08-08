CREATE TABLE "Votings" (
	"voting_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"external_url" varchar(255),
	"created_by" uuid,
	"public" boolean NOT NULL,
	"active" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
