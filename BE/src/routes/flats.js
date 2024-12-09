import { Router } from "express";
import * as flatController from "../controllers/flats.js";
import { GLOBAL_ERROR_MESSAGE, validationHelper } from "../utils/index.js";
import upload from "../middleware/mutler.js";

export const flatsRouter = Router();

flatsRouter.get("/", flatController.getFlats);

flatsRouter.post("/", upload.single("photo"), async (req, res, next) => {
  try {
    validationHelper(req, res);
    if (!req.file) {
      return res.status(400).json({
        errors: [{ message: "Photo is required" }],
      });
    }
    await flatController.createFlat(req, res, next);
  } catch (error) {
    console.error("Flat creation error:", error);
    return res
      .status(500)
      .json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
  }
});

flatsRouter.get("/:id", (req, res, next) => {
  try {
    validationHelper(req, res);

    flatController.getFlat(req, res, next);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
  }
});

flatsRouter.delete("/:id", (req, res, next) => {
  try {
    validationHelper(req, res);

    flatController.deleteFlat(req, res, next);
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
  }
});

flatsRouter.post("/filter", async (req, res, next) => {
  try {
    validationHelper(req, res);

    // Call the filter function in the controller
    await flatController.filterFlatsByRegions(req, res, next);
  } catch (error) {
    console.error("Error filtering flats by regions:", error);
    return res
      .status(500)
      .json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
  }
});
