CREATE TABLE `knowledge_links` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`from_node_id` integer NOT NULL,
	`to_node_id` integer NOT NULL,
	`relation` text DEFAULT 'references' NOT NULL,
	`context` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`from_node_id`) REFERENCES `knowledge_nodes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`to_node_id`) REFERENCES `knowledge_nodes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `knowledge_links_from_idx` ON `knowledge_links` (`from_node_id`);--> statement-breakpoint
CREATE INDEX `knowledge_links_to_idx` ON `knowledge_links` (`to_node_id`);--> statement-breakpoint
CREATE TABLE `knowledge_nodes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`body` text DEFAULT '' NOT NULL,
	`kind` text DEFAULT 'note' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`project_id` text,
	`source_url` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `knowledge_nodes_slug_unique` ON `knowledge_nodes` (`slug`);--> statement-breakpoint
CREATE INDEX `knowledge_nodes_kind_status_idx` ON `knowledge_nodes` (`kind`,`status`);--> statement-breakpoint
CREATE INDEX `knowledge_nodes_project_idx` ON `knowledge_nodes` (`project_id`);--> statement-breakpoint
CREATE TABLE `node_tags` (
	`node_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	PRIMARY KEY(`node_id`, `tag_id`),
	FOREIGN KEY (`node_id`) REFERENCES `knowledge_nodes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `revisions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`node_id` integer NOT NULL,
	`body` text NOT NULL,
	`reason` text DEFAULT 'manual edit' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`node_id`) REFERENCES `knowledge_nodes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `revisions_node_idx` ON `revisions` (`node_id`);--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`color` text DEFAULT '#72f1b8' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tags_name_unique` ON `tags` (`name`);