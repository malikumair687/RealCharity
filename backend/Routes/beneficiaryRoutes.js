import express from "express";
import { getBeneficiariesCount } from "../Controllers/BeneficiaryController.js";

const router = express.Router();

// GET /api/beneficiaries/count
router.get("/count", getBeneficiariesCount);

export default router;
