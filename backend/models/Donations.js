import mongoose from "mongoose";
const donationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String },
  documentImg: { type: String },
  preference: { type: String },
  confirmation: { type: String, enum: ["Pending", "Confirmed"], default: "Pending" },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Donation = mongoose.model("Donation", donationSchema); 
export default Donation;