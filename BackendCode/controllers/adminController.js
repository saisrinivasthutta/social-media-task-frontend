const { deleteAllImages } = require("../models/imageModel");
const db = require("../db/database");

const adminLogin = (req, res) => {
  res.status(200).json({ message: "Admin login successful" });
};

const resetDatabase = (req, res) => {
  db.serialize(() => {
    db.run(`DELETE FROM users`);
    deleteAllImages((err) => {
      if (err) {
        return res.status(500).json({ message: "Error resetting database." });
      }
      res.status(200).json({ message: "Database reset successfully." });
    });
  });
};

module.exports = { adminLogin, resetDatabase };
