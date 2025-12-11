import Charity from "../models/Charity.js";

// Get total number of registered charities
export const getCharitiesCount = async (req, res) => {
  try {
    const totalCharities = await Charity.countDocuments();
    res.json({ totalCharities });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
