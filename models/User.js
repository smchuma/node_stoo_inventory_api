import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      maxLength: 255,
    },
    last_name: {
      type: String,
      required: true,
      maxLength: 255,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
      maxLength: 10,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "salesperson"],
      default: "salesperson",
    },
    password: {
      type: String,
      required: true,
    },
    last_login: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
