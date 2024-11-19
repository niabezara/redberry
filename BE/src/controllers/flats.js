import { prisma } from "../index.js";

export const getFlats = async (req, res) => {
  try {
    const flats = await prisma.flat.findMany({
      include: {
        region: true,
        profilePicture: {
          select: {
            id: true,
            name: true,
            path: true,
          },
        },
      },
    });

    return res.json({
      data: flats,
    });
  } catch (error) {
    return res.status(500).json("error");
  }
};
