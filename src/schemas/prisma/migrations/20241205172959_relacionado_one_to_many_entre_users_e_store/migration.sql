-- DropForeignKey
ALTER TABLE "stores" DROP CONSTRAINT "stores_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "store_id" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
