CREATE TABLE `rsvps` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`attendance` text NOT NULL,
	`guests` integer NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`created_at` integer NOT NULL,
	`request_key` text NOT NULL,
	CONSTRAINT "rsvps_attendance_check" CHECK("rsvps"."attendance" IN ('hadir', 'tidak')),
	CONSTRAINT "rsvps_guests_check" CHECK(("rsvps"."attendance" = 'hadir' AND "rsvps"."guests" BETWEEN 1 AND 5) OR ("rsvps"."attendance" = 'tidak' AND "rsvps"."guests" = 0))
);

--> statement-breakpoint
CREATE INDEX `rsvps_created_idx` ON `rsvps` (`created_at`,`id`);
--> statement-breakpoint
CREATE INDEX `rsvps_rate_idx` ON `rsvps` (`request_key`,`created_at`);
