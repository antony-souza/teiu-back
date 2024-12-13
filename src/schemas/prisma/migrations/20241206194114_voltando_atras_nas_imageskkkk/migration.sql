/*
  Warnings:

  - Made the column `image_url` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image_url` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image_url` on table `stores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image_url` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "image_url" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "image_url" SET NOT NULL;

-- AlterTable
ALTER TABLE "stores" ALTER COLUMN "image_url" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "image_url" SET NOT NULL;
