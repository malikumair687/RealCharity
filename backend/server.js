import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./Routes/userRoutes.js";
import campaignRoutes from "./Routes/campaignRoutes.js";
import donationRoutes from "./Routes/donationRoutes.js";
import beneficiaryRoutes from "./Routes/beneficiaryRoutes.js";
import charityRoutes from "./Routes/charityRoutes.js";
import reportRoute from "./Routes/reportRoute.js";
import summaryRoute from "./Routes/summaryRoute.js";
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Database connection
mongoose
  .connect("mongodb+srv://fareehaasghar487_db_user:charity@cluster0.asnuo9t.mongodb.net")
  .then(() => console.log("✅ Database is connected successfully"))
  .catch((err) => console.log("❌ Error in connecting database", err));

// Routes
app.use(userRoutes);
app.use(campaignRoutes);
app.use(donationRoutes);
app.use(beneficiaryRoutes);
app.use(charityRoutes);
app.use(summaryRoute);
app.use(reportRoute)

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running....");
});

// ✅ Error-handling middleware (must be at the end)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: err,
  });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
