import { User } from "../models/User.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const register = async (req, res) => {
  console.log(req.body);

  const { first_name, last_name, email, password, role, phone_number } =
    req.body;

  console.log("req.body");

  try {
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !role ||
      !phone_number
    ) {
      throw new Error("All fiends are required");
    }

    const userAlreadyExist = User.findOne({ email });

    if (userAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const hashedPassword = bcryptjs.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
      phone_number,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //expires after 24 hours
    });

    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  res.send("login");
};

export const logout = async (req, res) => {
  res.send("logout");
};
