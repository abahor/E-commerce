const express = require("express");
require('dotenv').config();
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

// dot en configuration
dotenv.config();

// DB connection
connectDb();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/orders", require("./routes/orderRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/resturantRoutes"));
app.use("/api/v1/category", require("./routes/catgeoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

// Root route
app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1>Welcome to Food Server APP API BASE PROJECT </h1>");
});

// CRUD Operations (added to server.js for simplicity)

// Get all foods
app.get("/api/v1/food", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Add a food
app.post("/api/v1/food", async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    res.status(400).json({ error: 'Error adding food' });
  }
});

// Update a food
app.put("/api/v1/food/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(food);
  } catch (err) {
    res.status(400).json({ error: 'Error updating food' });
  }
});

// Delete a food
app.delete("/api/v1/food/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting food' });
  }
});

// PORT
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.white.bgMagenta);
});
