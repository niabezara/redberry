/*
  Warnings:

  - You are about to drop the `Flat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Flat" DROP CONSTRAINT "Flat_regionId_fkey";

-- DropTable
DROP TABLE "public"."Flat";

-- DropTable
DROP TABLE "public"."Region";

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "postalCode" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "bedrooms" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "Flat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flat" ADD CONSTRAINT "Flat_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;
