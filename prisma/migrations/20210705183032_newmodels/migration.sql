/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TopLevelCategory" AS ENUM ('Courses', 'Services', 'Books');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "password" TEXT;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "ProductCharacteristic" (
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    PRIMARY KEY ("name","value")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "initialRating" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "oldPrice" INTEGER,
    "credit" INTEGER,
    "description" TEXT NOT NULL,
    "advantages" TEXT,
    "disAdvantages" TEXT,
    "categories" TEXT[],
    "tags" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HhData" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "juniorSalary" INTEGER,
    "middleSalary" INTEGER,
    "seniorSalary" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "topPageId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopPageAdvantage" (
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topPageId" INTEGER NOT NULL,

    PRIMARY KEY ("title","description")
);

-- CreateTable
CREATE TABLE "TopPage" (
    "id" SERIAL NOT NULL,
    "firstCategory" "TopLevelCategory" NOT NULL,
    "secondCategory" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metaTitle" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "seoText" TEXT NOT NULL,
    "tagsTitle" TEXT NOT NULL,
    "tags" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HhData_topPageId_unique" ON "HhData"("topPageId");

-- CreateIndex
CREATE UNIQUE INDEX "TopPage.alias_unique" ON "TopPage"("alias");

-- AddForeignKey
ALTER TABLE "ProductCharacteristic" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HhData" ADD FOREIGN KEY ("topPageId") REFERENCES "TopPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopPageAdvantage" ADD FOREIGN KEY ("topPageId") REFERENCES "TopPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
