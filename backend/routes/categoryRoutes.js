import express from "express";
import {
  createCategory,
  getCategory,
  getCategoryById,
  getCategoryEnable,
  updateCategoryById,
} from "../controllers/categoryController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getCategory);
router.route("/enable").get(getCategoryEnable);
router.route("/:id").get(getCategoryById);

router.route("/:id").put(protect, updateCategoryById);

router.route("/").post(protect, createCategory);

export default router;
