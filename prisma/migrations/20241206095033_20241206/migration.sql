-- CreateTable
CREATE TABLE `menuItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `path` VARCHAR(191) NULL,
    `heading` VARCHAR(191) NULL,
    `disabled` BOOLEAN NOT NULL DEFAULT false,
    `collapse` BOOLEAN NOT NULL DEFAULT false,
    `collapseTitle` VARCHAR(191) NULL,
    `expandTitle` VARCHAR(191) NULL,
    `parentId` INTEGER NULL,
    `menuType` ENUM('SIDEBAR', 'MEGA', 'ROOT') NOT NULL DEFAULT 'SIDEBAR',
    `placement` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `menuItem` ADD CONSTRAINT `menuItem_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `menuItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
