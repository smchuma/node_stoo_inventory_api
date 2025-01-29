import express from "express";
import {
  login,
  logout,
  register,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

// autnetication routes
router.get("/check_auth", verifyAuth, checkAuth);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
