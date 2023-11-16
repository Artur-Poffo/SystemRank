/*
  Warnings:

  - Added the required column `system_page_link` to the `systems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "systems" ADD COLUMN     "system_page_link" TEXT NOT NULL;
