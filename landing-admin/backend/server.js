import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import sectionRoutes from "./src/routes/sectionRoutes.js";
import { notFound, errorHandler } from "./src/middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/sections", sectionRoutes);

// Error middlewares
app.use(notFound);
app.use(errorHandler);

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
