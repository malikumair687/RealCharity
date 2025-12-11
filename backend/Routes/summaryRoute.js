// routes/summaryRoutes.js
import express from "express";
import { getSummary } from "../Controllers/SummaryController.js";

const router = express.Router();

router.get("/get-summary", getSummary);

export default router;
