CREATE TABLE `decisions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`context` text DEFAULT '' NOT NULL,
	`rationale` text DEFAULT '' NOT NULL,
	`impact` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'Ativa' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
