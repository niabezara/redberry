import { Router } from "express";
import * as regionController from "../controllers/regions.js";
import { GLOBAL_ERROR_MESSAGE, validationHelper } from "../utils/index.js";

export const regionsRouter = Router();

regionsRouter.get("/", regionController.getRegions);

regionsRouter.post("/filter", async (req, res, next) => {
  try {
    validationHelper(req, res);
    await regionController.filterRegion(req, res, next); // Call the filtering function
  } catch (error) {
    console.error("Error filtering regions:", error);
    return res
      .status(500)
      .json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
  }
});
