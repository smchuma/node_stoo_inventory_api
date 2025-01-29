import { User } from "../models/User.js";
import bcryptjs from "bcryptjs";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// create new user

export const createNewUser = async (req, res) => {
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

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const phoneNumberExists = await User.findOne({ phone_number });

    if (phoneNumberExists) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exist",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
      phone_number,
      verificationToken,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.stauts(400).ison({
        success: false,
        message: "User not found",
      });
    }

    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.role = req.body.role;
    user.phone_number = req.body.phone_number;

    updateUser.save();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
