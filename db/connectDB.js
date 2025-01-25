import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected Successfully`);
  } catch (error) {
    console.log("Failed connecting to MongoDB", error.message);
    process.exit(1); // 1 is failure, 0 success
  }
};
