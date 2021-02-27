import {MigrationInterface, QueryRunner} from "typeorm";

export class contadorUsuarios1614383806929 implements MigrationInterface {
    name = 'contadorUsuarios1614383806929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `User` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(500) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(128) NOT NULL, `roles` text NOT NULL, `status` tinyint NOT NULL DEFAULT 1, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `UserSede` (`id` int NOT NULL AUTO_INCREMENT, `id_user` int NULL, `id_sede` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Sede` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(240) NOT NULL, `userCounter` int NOT NULL DEFAULT '0', `id_city` int NULL, UNIQUE INDEX `IDX_25cc2e7c6d2a4f9c2f0ace0d02` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `City` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(128) NOT NULL, UNIQUE INDEX `IDX_5f6420271949624dcfe46e2410` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `UserSede` ADD CONSTRAINT `FK_f454aa25d30f00bf5cd38a6df55` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `UserSede` ADD CONSTRAINT `FK_04d919dbc01ca1a8b093ea8e4da` FOREIGN KEY (`id_sede`) REFERENCES `Sede`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Sede` ADD CONSTRAINT `FK_7975f5d323e4a709f93aa478823` FOREIGN KEY (`id_city`) REFERENCES `City`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Sede` DROP FOREIGN KEY `FK_7975f5d323e4a709f93aa478823`");
        await queryRunner.query("ALTER TABLE `UserSede` DROP FOREIGN KEY `FK_04d919dbc01ca1a8b093ea8e4da`");
        await queryRunner.query("ALTER TABLE `UserSede` DROP FOREIGN KEY `FK_f454aa25d30f00bf5cd38a6df55`");
        await queryRunner.query("DROP INDEX `IDX_5f6420271949624dcfe46e2410` ON `City`");
        await queryRunner.query("DROP TABLE `City`");
        await queryRunner.query("DROP INDEX `IDX_25cc2e7c6d2a4f9c2f0ace0d02` ON `Sede`");
        await queryRunner.query("DROP TABLE `Sede`");
        await queryRunner.query("DROP TABLE `UserSede`");
        await queryRunner.query("DROP TABLE `User`");
    }

}
