/*
  Warnings:

  - You are about to drop the column `total` on the `sales` table. All the data in the column will be lost.
  - Added the required column `quantity_sold` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_billed` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales" DROP COLUMN "total",
ADD COLUMN     "quantity_sold" INTEGER NOT NULL,
ADD COLUMN     "total_billed" DOUBLE PRECISION NOT NULL;
