CREATE TABLE `settings` (
	`key` varchar(255) NOT NULL,
	`value` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);

ALTER TABLE `users` ADD `password` varchar(255) NOT NULL;