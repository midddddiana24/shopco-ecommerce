const express = require("express");
const orderController = require("../controllers/orderController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, orderController.createOrder);
router.get("/myorders", protect, orderController.getMyOrders);
router.get("/:id", protect, orderController.getOrderById);
router.put(
  "/:id/status",
  protect,
  authorize('admin'),
  orderController.updateOrderStatus,
);
router.get("/", protect, authorize('admin'), orderController.getAllOrders);

module.exports = router;