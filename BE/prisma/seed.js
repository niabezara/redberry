import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const regionsData = [
  {
    name: "თბილისი",
    code: "TBL",
  },
  {
    name: "ბათუმი",
    code: "BAT",
  },
  {
    name: "ქუთაისი",
    code: "KUT",
  },
  {
    name: "ზუგდიდი",
    code: "ZGD",
  },
  {
    name: "რუსთავი",
    code: "RST",
  },
  {
    name: "ბორჯომი",
    code: "BRJ",
  },
  {
    name: "გორი",
    code: "GOR",
  },
  {
    name: "თელავი",
    code: "TEL",
  },
  {
    name: "მცხეთა",
    code: "MCT",
  },
];

async function seedRegions() {
  try {
    // Delete all existing regions
    await prisma.region.deleteMany({});

    // Insert new regions
    await prisma.region.createMany({
      data: regionsData,
    });

    console.log("Regions data has been seeded successfully.");
  } catch (error) {
    console.error("Error seeding regions data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedRegions();
