// models/reportModel.js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  id: String,
  campaign: String,
  donated: String,
  utilized: String,
  beneficiaries: String,
  status: String,
  date: String,
});

export default mongoose.model("Report", reportSchema);
