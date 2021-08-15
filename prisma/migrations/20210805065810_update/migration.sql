/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ProductCharacteristic` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductCharacteristic.name_unique" ON "ProductCharacteristic"("name");
