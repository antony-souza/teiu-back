/*
  Warnings:

  - You are about to drop the `charts` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "date" TEXT NOT NULL DEFAULT '00/00/0000';

-- DropTable
DROP TABLE "charts";
