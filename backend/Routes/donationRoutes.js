import express from "express";
import {
  createDonation,
  getAllDonations,
  deleteDonation,
  updateDonation,
} from "../Controllers/DonationController.js";
import upload from "../MiddleWare/multer.js";

const router = express.Router();

// Create a donation
router.post("/create-donation", upload.single("documentImg"), createDonation);

// Get all donations
router.get("/get-all-donations", getAllDonations);

// Delete a donation by ID
router.delete("/delete-donation/:id", deleteDonation);

// Update/Edit a donation by ID
router.put("/update-donation/:id", upload.single("documentImg"), updateDonation);

export default router;
