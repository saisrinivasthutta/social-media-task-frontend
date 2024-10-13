const adminAuth = (req, res, next) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password123") {
    next();
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = adminAuth;
