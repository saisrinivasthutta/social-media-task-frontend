const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuth = require("../middlewares/authMiddleware");
const { resetDatabase } = require("../controllers/adminController");

router.post("/admin/login", adminAuth, adminController.adminLogin);

router.post("/admin/reset-database", resetDatabase);

module.exports = router;
