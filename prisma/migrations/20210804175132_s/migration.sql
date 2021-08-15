-- DropForeignKey
ALTER TABLE "ProductCharacteristic" DROP CONSTRAINT "ProductCharacteristic_productId_fkey";

-- AddForeignKey
ALTER TABLE "ProductCharacteristic" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
