import { prisma } from "../index.js";

export const getRegions = async (req, res) => {
  try {
    const regions = await prisma.Region.findMany({
      include: {
        flats: true,
      },
    });

    return res.json({
      data: regions,
    });
  } catch (error) {
    return res.status(500).json("error");
  }
};
