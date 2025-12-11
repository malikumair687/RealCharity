import Beneficiary from "../models/Beneficiary.js";

// Get total number of beneficiaries
export const getBeneficiariesCount = async (req, res) => {
  try {
    const totalBeneficiaries = await Beneficiary.countDocuments();
    res.json({ totalBeneficiaries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
