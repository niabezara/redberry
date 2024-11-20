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

import multer from "multer";

// Set up multer to handle file uploads
const upload = multer({ dest: "uploads/" });

// Add the middleware to your route
export const createAgents = async (req, res, next) => {
  upload.single("photo")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload error." });
    }

    try {
      const { firstName, lastName, email, phoneNumber } = req.body;
      console.log(req.body); // Log parsed form fields
      console.log(req.file); // Log uploaded file details (if any)

      // Validate required fields
      if (!firstName || !email || !phoneNumber) {
        return res.status(400).json({
          message:
            "Missing required fields: firstName, email, and phoneNumber are mandatory.",
        });
      }

      const agent = await prisma.agent.create({
        data: {
          name: firstName,
          surname: lastName || "",
          email,
          phoneNumber,
          photo: req.file?.filename || null, // Save filename if a photo is uploaded
        },
      });

      return res.status(201).json({ data: agent });
    } catch (error) {
      console.error(error);

      if (
        error.code === "P2002" &&
        error.meta &&
        error.meta.target.includes("email")
      ) {
        return res.status(400).json({
          message: "Email address already exists.",
        });
      }

      return res.status(500).json({
        message: "Error creating agent",
        error: error.message,
      });
    }
  });
};
