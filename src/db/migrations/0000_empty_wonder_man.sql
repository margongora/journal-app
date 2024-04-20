CREATE TABLE IF NOT EXISTS "journals" (
	"id" serial PRIMARY KEY NOT NULL,
	"date_created" date DEFAULT now(),
	"content" text
);
