/*
  Warnings:

  - Added the required column `permissions` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `roles` ADD COLUMN `permissions` JSON NOT NULL;
