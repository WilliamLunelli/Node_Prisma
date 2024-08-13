/*
  Warnings:

  - You are about to drop the column `Sub_Title` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "Sub_Title",
ADD COLUMN     "subtitle" TEXT;
