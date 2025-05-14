const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
adminMiddleware = require("../middlewares/adminMiddleware");


const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require("../controllers/categoryController");

const router = express.Router();

//routes
// CREATE CAT
router.post("/create", authMiddleware, adminMiddleware, createCatController);

//GET ALL CAT
router.get("/getAll", getAllCatController);

// UPDATE CAT
router.put("/update/:id", authMiddleware, adminMiddleware, updateCatController);

// DLEETE CAT
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteCatController);

module.exports = router;
