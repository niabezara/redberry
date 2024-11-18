import { Router } from "express";
import * as regionController from "../controllers/regions.js";

export const regionsRouter = Router();

regionsRouter.get("/", regionController.getRegions);
