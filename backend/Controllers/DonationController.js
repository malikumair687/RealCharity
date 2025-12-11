import Donation from "../models/Donations.js";
import { asyncHandler } from "../MiddleWare/utils.js";

// Create donation
export const createDonation = asyncHandler(async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    let imageUrl = null;
    if (req.file && req.file.path) {
      imageUrl = req.file.path; // Cloudinary URL or local path
    }

    const donation = new Donation({
      ...req.body,
      documentImg: imageUrl,
      confirmation: "Pending",
    });

    await donation.save();

    res.status(201).json({
      message: "Donation submitted successfully!",
      donation,
    });
  } catch (err) {
    console.error("Donation creation error:", err);

    res.status(500).json({
      message: "Failed to create donation",
      error: err.message || err,
    });
  }
});

// Get all donations
export const getAllDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find();
  res.status(200).json(donations);
});

// Delete a donation
export const deleteDonation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const donation = await Donation.findById(id);

  if (!donation) {
    return res.status(404).json({ message: "Donation not found" });
  }

  await donation.deleteOne();

  res.status(200).json({ message: "Donation deleted successfully" });
});

// Update/Edit a donation
export const updateDonation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const donation = await Donation.findById(id);

  if (!donation) {
    return res.status(404).json({ message: "Donation not found" });
  }
  Object.keys(req.body).forEach((key) => {
    donation[key] = req.body[key];
  });
  if (req.file && req.file.path) {
    donation.documentImg = req.file.path;
  }
  await donation.save();

  res.status(200).json({ message: "Donation updated successfully", donation });
});
