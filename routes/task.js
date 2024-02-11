import express from "express";
import {
  deletetask,
  getmytask,
  newtask,
  updatetask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newtask);
router.get("/my", isAuthenticated, getmytask);
router
  .route("/:id")
  .put(isAuthenticated, updatetask)
  .delete(isAuthenticated, deletetask);

export default router;
