import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import cors from "cors";
import * as Routers from "./routes/index.js";
import { createSoftDeleteMiddleware } from "prisma-soft-delete-middleware";

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Prisma Client
const prisma = new PrismaClient({
  log: ["error"],
});

// Soft delete middleware setup
const allModelNames = Object.keys(Prisma.ModelName).reduce((acc, key) => {
  if (!["UserPermission"].includes(key)) {
    acc[key] = true;
  }
  return acc;
}, {});

prisma.$use(
  createSoftDeleteMiddleware({
    models: allModelNames,
    defaultConfig: {
      field: "deletedAt",
      allowToOneUpdates: true,
      allowCompoundUniqueIndexWhere: true,
      createValue: (deleted) => (deleted ? new Date() : null),
    },
  })
);

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/v1/regions", Routers.regionsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { prisma };
