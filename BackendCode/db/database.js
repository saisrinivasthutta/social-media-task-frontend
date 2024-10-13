const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/images.db");

// Create users and images table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    handle TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    filename TEXT,
    filepath TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

module.exports = db;
