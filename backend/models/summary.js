// models/summaryModel.js
import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
  title: String,
  value: String
});

export default mongoose.model("Summary", summarySchema);
