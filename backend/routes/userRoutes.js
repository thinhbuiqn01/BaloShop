import express from "express";
import {
  authUser,
  createUser,
  getUserById,
  getUserProfile,
  getUsersAdmin,
  getUsersCustomer,
  registerUser,
  updateUserById,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/admin/users").get(protect, getUsersAdmin);
router.route("/customer").get(protect, getUsersCustomer);
router.route("/create").post(protect, createUser);
router.route("/:id").get(protect, getUserById);
router.route("/:id").put(protect, updateUserById);

export default router;
