import { prisma } from "../index.js";

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
    const { id } = req.params;

    const agent = await prisma.agent.findUnique({
      where: {
        id: Number(id),
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

export const createAgents = async (req, res) => {
  if (req.file) {
    try {
      // Explicitly pass cloud name to upload
      const result = await cloudinary.uploader.upload(req.file.path, {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        folder: "flats_upload",
      });

      const { firstName, lastName, email, phoneNumber } = req.body;

      // Assign uploaded file URL to photo
      const photoUrl = result.secure_url;

      // Create agent with the uploaded photo URL
      const agent = await prisma.agent.create({
        data: {
          name: firstName,
          surname: lastName,
          email: email,
          phoneNumber: phoneNumber,
          photo: photoUrl, // Save Cloudinary URL to photo field
        },
      });

      return res.status(201).json({ data: agent });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        error: "Error uploading to Cloudinary",
      });
    }
  } else {
    return res.status(400).json({ error: "No file uploaded" });
  }
};
