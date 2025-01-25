import express from "express";
import {
  login,
  logout,
  register,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.get("/user", verifyAuth, checkAuth);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
