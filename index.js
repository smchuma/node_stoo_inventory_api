import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json()); //parse json requests
app.use(cookieParser()); //parse cookies

const PORT = process.env.PORT || 4000;

app.use("/api/auth/", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
