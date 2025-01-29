import express from "express";
import {
  createNewUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.get("/users", verifyAuth, getAllUsers);
router.post("/users", verifyAuth, createNewUser);
router.put("/users/:id", verifyAuth, updateUser);

export default router;
