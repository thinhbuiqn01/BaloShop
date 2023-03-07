import express from "express";
import {
  getProducts,
  getProductById,
  getProductEnable,
  updateProductById,
  createProduct,
  deleteProductById,
  reviewProductById,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadFile.js";
// const upload = require("../middlewares/uploadFile.js");

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(getProductById);

router.route("/enable").get(getProductEnable);

router
  .route("/:id")
  .put(
    protect,
    upload.fields([{ name: "image", maxCount: 4 }]),
    updateProductById
  );

router.route("/delete/:id").delete(deleteProductById);

router
  .route("/")
  .post(
    protect,
    upload.fields([{ name: "image", maxCount: 4 }]),
    createProduct
  );
router.route("/review/:id").put(protect, reviewProductById);

export default router;
