
drop table if exists `tags`;
CREATE TABLE `tags`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `status` TINYINT NOT NULL
);

drop table if exists `sites_tags`;
CREATE TABLE `sites_tags`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `tags_id` BIGINT NOT NULL,
    `sites_id` BIGINT NOT NULL,
    `status` TINYINT NOT NULL
);

drop table if exists `users_tags`;
CREATE TABLE `users_tags`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `tag_id` BIGINT NOT NULL,
    `status` TINYINT NOT NULL
);
drop table if exists `sites`;

CREATE TABLE `sites`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `url` VARCHAR(255) NOT NULL,
    `status` TINYINT NOT NULL
);
drop table if exists `users`;

CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` BIGINT NOT NULL
);
drop table if exists `users_sites`;

CREATE TABLE `users_sites`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `site_id` BIGINT NOT NULL,
    `status` TINYINT NOT NULL
);
ALTER TABLE
    `sites_tags` ADD CONSTRAINT `sites_tags_sites_id_foreign` FOREIGN KEY(`sites_id`) REFERENCES `sites`(`id`);
ALTER TABLE
    `users_tags` ADD CONSTRAINT `users_tags_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `users_tags` ADD CONSTRAINT `users_tags_tag_id_foreign` FOREIGN KEY(`tag_id`) REFERENCES `tags`(`id`);
ALTER TABLE
    `sites_tags` ADD CONSTRAINT `sites_tags_tags_id_foreign` FOREIGN KEY(`tags_id`) REFERENCES `tags`(`id`);
ALTER TABLE
    `users_sites` ADD CONSTRAINT `users_sites_site_id_foreign` FOREIGN KEY(`site_id`) REFERENCES `sites`(`id`);
ALTER TABLE
    `users_sites` ADD CONSTRAINT `users_sites_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);