import { prisma } from "../index.js";
import cloudinary from "../utils/cloudinary.js";

export const getFlats = async (req, res) => {
  try {
    const flats = await prisma.flat.findMany({
      include: {
        region: true,
        agent: true,
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

export const createFlat = async (req, res) => {
  if (req.file) {
    try {
      // Explicitly pass cloud name to upload
      const result = await cloudinary.uploader.upload(req.file.path, {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        folder: "flats_upload",
      });

      const {
        type,
        address,
        postalCode,
        region,
        city,
        price,
        area,
        bedrooms,
        description,
        agents,
      } = req.body;

      let profilePictureData = null;

      // Handle file upload if a file is provided
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "flats_upload",
          });

          // Assign uploaded file details to profilePictureData
          profilePictureData = {
            path: result.secure_url,
            name: req.file.originalname,
            size: req.file.size,
          };
        } catch (uploadError) {
          console.error("Cloudinary Upload Error:", uploadError);
          return res.status(500).json({
            error: "Error uploading to Cloudinary",
            details: uploadError.message,
          });
        }
      }

      const flat = await prisma.flat.create({
        data: {
          type,
          streetAddress: address,
          postalCode,
          price: price ? parseFloat(price) : null,
          area,
          bedrooms,
          description,
          agent: {
            connect: { id: agents },
          },
          ...(profilePictureData && {
            profilePicture: {
              create: profilePictureData,
            },
          }),
          region: {
            connect: { id: region },
          },
          city: {
            connect: { id: city },
          },
        },
      });
      return res.status(201).json({ data: flat });
    } catch (error) {
      console.error("Error");
      return res.status(500).json({
        error: "Error uploading to Cloudinary",
      });
    }
  }
};

export const getFlat = async (req, res, next) => {
  try {
    const flatdetail = await prisma.flat.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        agent: {
          include: {
            photo: true,
          },
        },
        profilePicture: true,
        region: true,
      },
    });

    return res.json(flatdetail);
  } catch (error) {
    return next(error);
  }
};

export const deleteFlat = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received ID for deletion:", id);
    const deletedFlat = await prisma.flat.delete({
      where: {
        id: id,
      },
    });
    res
      .status(200)
      .json({ message: "Flat deleted successfully", data: deletedFlat });
  } catch (error) {
    console.error("Error deleting flat:", error.message);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};

export const filterFlatsByRegions = async (req, res, next) => {
  try {
    const { regionIds, priceFrom, priceTo } = req.body;

    // if (!Array.isArray(regionIds) || regionIds.length === 0) {
    //   return res
    //     .status(400)
    //     .json({ errors: [{ message: "Invalid regionNames" }] });
    // }

    const priceFilter = {};
    if (priceFrom || priceTo) {
      if (priceFrom) {
        priceFilter.gte = priceFrom; // Price greater than or equal to priceFrom
      }
      if (priceTo) {
        priceFilter.lte = priceTo; // Price less than or equal to priceTo
      }
    }

    const flats = await prisma.flat.findMany({
      where: {
        ...(regionIds?.length > 0 && {
          regionId: {
            in: regionIds,
          },
        }),
        ...(priceFrom &&
          priceTo && {
            price: {
              gte: parseFloat(priceFrom),
              lte: parseFloat(priceTo),
            },
          }),
        deletedAt: null,
      },
      include: {
        profilePicture: true,
        region: true,
      },
    });
    return res.json({ data: flats });
  } catch (error) {
    console.error("Error filtering flats:", error);
    return res
      .status(500)
      .json({ errors: [{ message: "Internal server error" }] });
  }
};
