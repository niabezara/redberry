import { Router } from "express";
import * as flatController from "../controllers/flats.js";

export const flatsRouter = Router();

flatsRouter.get("/", flatController.getFlats);
