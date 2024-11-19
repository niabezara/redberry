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

export const createAgents = async (req, res, next) => {
  try {
    const { name, surname, email, phoneNumber, photo } = req.body;

    const agent = await prisma.agent.create({
      data: {
        name,
        surname: surname || null,
        email,
        phoneNumber,
        photo,
      },
    });

    return res.status(201).json({ data: agent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating agent",
      error: error.message,
    });
  }
};
