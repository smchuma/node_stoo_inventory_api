import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use("/api/auth/", authRoutes);
app.use(express.json()); //allow to parse json requests

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
