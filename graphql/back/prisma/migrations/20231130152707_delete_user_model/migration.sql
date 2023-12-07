/*
  Warnings:

  - You are about to drop the column `postedById` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_postedById_fkey";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "postedById";

-- DropTable
DROP TABLE "User";
