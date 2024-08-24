-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_company_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "company_id" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
