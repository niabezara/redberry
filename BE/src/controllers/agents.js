import { prisma } from "../index.js";
import cloudinary from "../utils/cloudinary.js";

export const getAgents = async (req, res, next) => {
  try {
    const agents = await prisma.agent.findMany();
    return res.json({
      data: agents,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching agents",
      error: error.message,
    });
  }
};

export const getAgent = async (req, res, next) => {
  try {
    const agent = await prisma.agent.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        photo: true,
      },
    });

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found",
      });
    }
    return res.json({
      data: agent,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching agent",
      error: error.message,
    });
  }
};

export const createAgent = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;
    console.log(req.body);
    let photoData = null;

    // Handle file upload if a photo is provided
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          folder: "agents_upload", // Use a dedicated folder for agent photos
        });

        photoData = {
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

    const agent = await prisma.agent.create({
      data: {
        name: firstName,
        surname: lastName,
        phoneNumber,
        email,
        ...(photoData && {
          photo: {
            create: photoData,
          },
        }),
      },
    });

    return res.status(201).json({ data: agent });
  } catch (error) {
    console.error("Error creating agent:", error);
    return res.status(500).json({
      error: "Error creating agent",
      details: error.message,
    });
  }
};
