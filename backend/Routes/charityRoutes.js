import express from "express";
import { getCharitiesCount } from "../Controllers/CharityController.js";

const router = express.Router();

// GET /api/charities/count
router.get("/count", getCharitiesCount);

export default router;
