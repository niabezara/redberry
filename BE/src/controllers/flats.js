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
