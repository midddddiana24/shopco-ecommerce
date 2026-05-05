const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    zipCode: String,
  },
  paymentMethod: { type: String, default: "cod" }, // cod = Cash on Delivery
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  trackingNumber: { type: String, default: null },
  notes: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);