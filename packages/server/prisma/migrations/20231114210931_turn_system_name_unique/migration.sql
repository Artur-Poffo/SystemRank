/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `systems` will be added. If there are existing duplicate values, this will fail.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "systems_name_key" ON "systems"("name");
