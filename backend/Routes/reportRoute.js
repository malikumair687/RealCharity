// routes/reportRoutes.js
import express from "express";
import { getReports } from "../Controllers/ReportController.js";

const router = express.Router();

router.get("/", getReports);

export default router;
