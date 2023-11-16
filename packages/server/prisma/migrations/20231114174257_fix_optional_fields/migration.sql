-- AlterTable
ALTER TABLE "systems" ALTER COLUMN "system_logo_image_path" DROP NOT NULL,
ALTER COLUMN "system_cover_image_path" DROP NOT NULL,
ALTER COLUMN "system_page_link" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "profile_image_path" DROP NOT NULL;
