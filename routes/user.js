import express from "express";
import {
  getAllUser,
  registerNewUser,
  login,
  logout,
  getUserDetails,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUser);

// router.route("/specificuserid/:id").get(getUserDetails);
router.get("/me", isAuthenticated, getUserDetails);

router.post("/login", login);
router.post("/logout", logout);
// Registered new user
router.post("/new", registerNewUser);

export default router;
