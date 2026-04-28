const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");

const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

const app = express();

// middleware
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// server start
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});