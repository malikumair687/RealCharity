// controllers/summaryController.js
import Summary from "../models/summary.js";

export const getSummary = async (req, res) => {
  try {
    const data = await Summary.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
