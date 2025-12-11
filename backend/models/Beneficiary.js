import mongoose from "mongoose";

const BeneficiarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Beneficiary", BeneficiarySchema);
