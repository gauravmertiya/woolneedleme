const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail"); // ✅ IMPORTANT

const JWT_SECRET = "secret123"; // move to .env later

// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json("User registered");
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: user._id, email }, JWT_SECRET);

    res.json({ token, email });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ FORGOT PASSWORD (UPDATED WITH EMAIL)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");

    // 🔐 generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // 🔗 IMPORTANT: use correct frontend URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // 📩 SEND EMAIL
    await sendEmail({
      to: user.email,
      subject: "Reset your password",
      html: `
        <div style="font-family: Arial;">
          <h2>Password Reset</h2>
          <p>You requested a password reset.</p>
          <a href="${resetUrl}" 
             style="display:inline-block;padding:10px 20px;background:#000;color:#fff;text-decoration:none;border-radius:5px;">
             Reset Password
          </a>
          <p>This link expires in 15 minutes.</p>
        </div>
      `,
    });

    res.json("Reset email sent successfully");

  } catch (err) {
    console.error(err);
    res.status(500).json("Email sending failed");
  }
});

// ✅ RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json("Invalid or expired token");
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json("Password reset successful");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;