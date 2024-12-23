CREATE TABLE `users` (
	`id` text(10) PRIMARY KEY NOT NULL,
	`email` text(120) NOT NULL,
	`username` text(30) NOT NULL,
	`password` text(120) NOT NULL,
	`active` integer DEFAULT true,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_users_email` ON `users` (`email`);