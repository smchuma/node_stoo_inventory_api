import { User } from "../models/User.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { first_name, last_name, email, password, role, phone_number } =
    req.body;

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

    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    generateToken(res, user._id);
    user.lastLogin = Date.now();
    await user.save();

    res.status(200).json({
      message: "Login successfully",
      success: true,
      user: {
        userRole: user.role,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({
    message: "Logout successfully",
  });
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
