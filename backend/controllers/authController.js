import crypto from "crypto";
import User from "../models/User.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔐 generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // save token in DB
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min

    await user.save();

    // 🔗 reset link (frontend)
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    console.log("Reset URL:", resetUrl);

    res.json({ message: "Reset link generated (check console)" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};