/*
  Warnings:

  - Made the column `user_id` on table `systems` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "systems" DROP CONSTRAINT "systems_user_id_fkey";

-- AlterTable
ALTER TABLE "systems" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "systems" ADD CONSTRAINT "systems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
