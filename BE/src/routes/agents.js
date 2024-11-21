import { Router } from "express";
import { GLOBAL_ERROR_MESSAGE, validationHelper } from "../utils/index.js";
import * as agentController from "../controllers/agents.js";
import upload from "../middleware/mutler.js";

export const agentsRouter = Router();

agentsRouter.get("/", async (req, res, next) => {
  try {
    validationHelper(req, res);

    agentController.getAgents(req, res, next);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
  }
});

agentsRouter.get("/:id", (req, res, next) => {
  try {
    validationHelper(req, res);

    agentController.getAgent(req, res, next);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
  }
});

agentsRouter.post("/", upload.single("photo"), async (req, res, next) => {
  try {
    validationHelper(req, res);
    if (!req.file) {
      return res.status(400).json({
        errors: [{ message: "Photo is required" }],
      });
    }
    await agentController.createAgent(req, res, next);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
  }
});
