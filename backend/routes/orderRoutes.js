const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const verifyToken = require("../middleware/authMiddleware");

// CREATE ORDER
router.post("/", verifyToken, async (req, res) => {

  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ORDERS BY EMAIL
router.get("/:email", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({
      userEmail: req.params.email,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;