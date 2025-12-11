// controllers/reportController.js
import Report from "../models/report.js";

export const getReports = async (req, res) => {
  try {
    const data = await Report.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
