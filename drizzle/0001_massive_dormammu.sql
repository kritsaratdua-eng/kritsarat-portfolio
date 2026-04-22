CREATE TABLE `contact_info` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320),
	`phone` varchar(50),
	`linkedinUrl` varchar(512),
	`githubUrl` varchar(512),
	`twitterUrl` varchar(512),
	`websiteUrl` varchar(512),
	`location` varchar(255),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gallery_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`description` text,
	`imageUrl` varchar(512) NOT NULL,
	`imageKey` varchar(512),
	`category` varchar(100),
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gallery_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `live_demos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`demoUrl` varchar(512),
	`embedUrl` varchar(512),
	`techStack` text,
	`thumbnailUrl` varchar(512),
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `live_demos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`techStack` text,
	`liveUrl` varchar(512),
	`githubUrl` varchar(512),
	`imageUrl` varchar(512),
	`featured` boolean DEFAULT false,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teaching_experiences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`organization` varchar(255),
	`period` varchar(100),
	`description` text,
	`topics` text,
	`targetAudience` varchar(255),
	`achievements` text,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teaching_experiences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teaching_plans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`subject` varchar(255),
	`gradeLevel` varchar(100),
	`duration` varchar(100),
	`objectives` text,
	`materials` text,
	`activities` text,
	`assessment` text,
	`notes` text,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teaching_plans_id` PRIMARY KEY(`id`)
);
