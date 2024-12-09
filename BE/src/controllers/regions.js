import { prisma } from "../index.js";

export const getRegions = async (req, res) => {
  try {
    const regions = await prisma.Region.findMany({
      include: {
        cities: true,
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

export const filterRegion = async (req, res) => {
  try {
    const { regionNames } = req.body; // Get an array of region names from the request body

    if (!regionNames || regionNames.length === 0) {
      return res.status(400).json({ message: "No region names provided." });
    }

    // Use `in` to match multiple region names
    const filteredData = await prisma.Region.findMany({
      where: {
        name: {
          in: regionNames, // Find regions with names that are in the `regionNames` array
        },
      },
      include: {
        cities: true,
        flats: true,
      },
    });

    if (filteredData.length === 0) {
      return res.status(404).json({
        message: "No data found for the specified regions.",
      });
    }

    return res.json({
      data: filteredData,
    });
  } catch (error) {
    console.error("Error filtering regions:", error);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
};
