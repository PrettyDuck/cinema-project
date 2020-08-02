CREATE TABLE IF NOT EXISTS `films` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255), `year` INTEGER, `filmDirector` VARCHAR(255), `filmDescription` VARCHAR(255), `averageRating` FLOAT, `coverImage` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `actors` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255), `birthYear` INTEGER, `profilePhoto` VARCHAR(255), PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `categories` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255), PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `film_reviews` (`id` INTEGER NOT NULL auto_increment , `ownerName` VARCHAR(255), `ratingPoint` INTEGER, `reviewText` VARCHAR(255), `filmId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`filmId`) REFERENCES `films` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `film_actor_items` (`id` INTEGER NOT NULL auto_increment , `actorId` INTEGER, `filmId` INTEGER, UNIQUE `film_actor_items_filmId_actorId_unique` (`actorId`, `filmId`), PRIMARY KEY (`id`), FOREIGN KEY (`actorId`) REFERENCES `actors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`filmId`) REFERENCES `films` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `film_category_items` (`id` INTEGER NOT NULL auto_increment , `filmId` INTEGER, `categoryId` INTEGER, UNIQUE `film_category_items_filmId_categoryId_unique` (`filmId`, `categoryId`), PRIMARY KEY (`id`), FOREIGN KEY (`filmId`) REFERENCES `films` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

INSERT INTO `film_categories` (`id`,`name`) VALUES (NULL,'Action'),(NULL,'Comedy'),(NULL,'Drama'),(NULL,'Horror'),(NULL,'Thriller'),(NULL,'Science Fiction'),(NULL,'Fantasy'),(NULL,'Adventure'),(NULL,'Animation'),(NULL,'Crime');
INSERT INTO `actors` (`id`,`name`,`birthYear`,`profilePhoto`) VALUES (NULL,'Godzilla',2020,'uploads\Godzilla-Cover.jpg');
INSERT INTO `actors` (`id`,`name`,`birthYear`,`profilePhoto`) VALUES (NULL,'Johnny Depp',1973,'uploads\Johnny_Depp_Deauville_2019.jpg');
INSERT INTO `actors` (`id`,`name`,`birthYear`,`profilePhoto`) VALUES (NULL,'Emma Watson',1990,'uploads\Emma_Watson_interview_in_2017.jpg');
INSERT INTO `films` (`id`,`name`,`year`,`filmDirector`,`filmDescription`,`averageRating`,`coverImage`,`createdAt`) VALUES (NULL,'Godzilla',2014,'Kventin Tarantino','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',2.5,'uploads\Godzilla-Cover.jpg','2020-08-01 22:39:57');
INSERT INTO `film_category_items` (`id`,`filmId`,`categoryId`) VALUES (NULL,1,1);
INSERT INTO `film_category_items` (`id`,`filmId`,`categoryId`) VALUES (NULL,1,4);
INSERT INTO `film_category_items` (`id`,`filmId`,`categoryId`) VALUES (NULL,1,5);
INSERT INTO `film_category_items` (`id`,`filmId`,`categoryId`) VALUES (NULL,1,6);
INSERT INTO `film_category_items` (`id`,`filmId`,`categoryId`) VALUES (NULL,1,8);
INSERT INTO `film_category_items` (`id`,`filmId`,`categoryId`) VALUES (NULL,1,9);
INSERT INTO `film_actor_items` (`id`,`actorId`,`filmId`) VALUES (NULL,2,1);
INSERT INTO `film_actor_items` (`id`,`actorId`,`filmId`) VALUES (NULL,3,1);
INSERT INTO `film_actor_items` (`id`,`actorId`,`filmId`) VALUES (NULL,1,1);