/*
  Warnings:

  - You are about to drop the `store_and_products` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `store_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "store_and_products" DROP CONSTRAINT "store_and_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "store_and_products" DROP CONSTRAINT "store_and_products_store_id_fkey";

-- DropForeignKey
ALTER TABLE "store_and_products" DROP CONSTRAINT "store_and_products_user_id_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "store_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "store_and_products";

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL DEFAULT '',
    "product_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
