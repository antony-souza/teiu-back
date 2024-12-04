/*
  Warnings:

  - Added the required column `category_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_product_id_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "category_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
