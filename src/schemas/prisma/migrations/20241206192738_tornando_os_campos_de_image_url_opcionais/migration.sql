-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "image_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "image_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "stores" ALTER COLUMN "image_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "image_url" DROP NOT NULL;
