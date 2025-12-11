import mongoose from "mongoose";

const CharitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Charity", CharitySchema);
