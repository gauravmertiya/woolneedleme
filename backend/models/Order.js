const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: String,
  items: Array,
  total: Number,
  customer: Object,
  paymentId: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
