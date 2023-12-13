drop table if exists `tags`;
CREATE TABLE `tags`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `status` TINYINT NOT NULL,
	PRIMARY KEY `tags_id_primary`(`id`)
);

drop table if exists `sites_tags`;
CREATE TABLE `sites_tags`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_tags` BIGINT NOT NULL,
    `site_id` BIGINT NOT NULL,
    `status` TINYINT NOT NULL,
    PRIMARY KEY `sites_tags_id_primary`(`id`)
);


CREATE TABLE `users_to_tags`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `id_tag` BIGINT NOT NULL,
    `status` TINYINT(1) NOT NULL
);
ALTER TABLE
    `users_to_tags` ADD PRIMARY KEY `users_to_tags_id_primary`(`id`);
CREATE TABLE `sites`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL,
    `status` TINYINT(1) NOT NULL
);
ALTER TABLE
    `sites` ADD PRIMARY KEY `sites_id_primary`(`id`);
CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` BIGINT NOT NULL
);
ALTER TABLE
    `users` ADD PRIMARY KEY `users_id_primary`(`id`);
CREATE TABLE `users_sites`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `site_id` BIGINT NOT NULL,
    `status` TINYINT(1) NOT NULL
);
ALTER TABLE
    `users_sites` ADD PRIMARY KEY `users_sites_id_primary`(`id`);

ALTER TABLE
    `sites_tags` ADD CONSTRAINT `sites_tags_site_id_foreign` FOREIGN KEY(`site_id`) REFERENCES `sites`(`id`);
ALTER TABLE
    `sites_tags` ADD CONSTRAINT `sites_tags_id_tags_foreign` FOREIGN KEY(`id_tags`) REFERENCES `tags`(`id`);
ALTER TABLE
    `users_sites` ADD CONSTRAINT `users_sites_site_id_foreign` FOREIGN KEY(`site_id`) REFERENCES `sites`(`id`);
ALTER TABLE
    `users_sites` ADD CONSTRAINT `users_sites_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
