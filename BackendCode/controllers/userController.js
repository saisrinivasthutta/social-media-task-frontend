const userModel = require("../models/userModel");
const imageModel = require("../models/imageModel");

const submitUser = (req, res) => {
  const { name, handle } = req.body;
  const files = req.files;

  if (!files || !name || !handle) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  userModel.insertUser(name, handle, (err, userId) => {
    if (err) return res.status(500).json({ message: "Database error" });

    const images = files.map((file) => ({
      userId,
      filename: file.filename,
      filepath: file.path,
    }));

    imageModel.insertImages(images, (err) => {
      if (err) return res.status(500).json({ message: "Error saving images" });
      res.status(200).json({ message: "Submission successful!" });
    });
  });
};

const getAllSubmissions = (req, res) => {
  userModel.getUsersWithImages((err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ submissions: rows });
  });
};

module.exports = { submitUser, getAllSubmissions };
