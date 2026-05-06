const express = require("express");
const productController = require("../controllers/productController");
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// Public routes
router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);

// Admin routes
router.post(
  "/",
  protect,
  authorize('admin'),
  upload.array("images", 5),
  productController.createProduct,
);
router.put(
  "/:id",
  protect,
  authorize('admin'),
  upload.array("images", 5),
  productController.updateProduct,
);
router.delete("/:id", protect, authorize('admin'), productController.deleteProduct);

module.exports = router;