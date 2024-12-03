/*
  Warnings:

  - Changed the type of `data` on the `charts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "charts" ALTER COLUMN "labels" SET NOT NULL,
ALTER COLUMN "labels" SET DATA TYPE TEXT,
DROP COLUMN "data",
ADD COLUMN     "data" DOUBLE PRECISION NOT NULL;
