CREATE TYPE "public"."role_enum" AS ENUM('owner', 'moderator', 'participant');--> statement-breakpoint
CREATE TABLE "voting_memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" "role_enum" DEFAULT 'participant' NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"voting_id" uuid NOT NULL,
	CONSTRAINT "voting_membership-unique" UNIQUE("user_id","voting_id")
);
--> statement-breakpoint
ALTER TABLE "voting_memberships" ADD CONSTRAINT "voting_memberships_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voting_memberships" ADD CONSTRAINT "voting_memberships_voting_id_votings_voting_id_fk" FOREIGN KEY ("voting_id") REFERENCES "public"."votings"("voting_id") ON DELETE no action ON UPDATE no action;