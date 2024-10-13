const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const userController = require("../controllers/userController");

// Set up multer storage
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes
router.post("/submit", upload.array("images", 10), userController.submitUser);
router.get("/submissions", userController.getAllSubmissions);

module.exports = router;
