const db = require("../db/database");

const insertUser = (name, handle, callback) => {
  db.run(
    `INSERT INTO users (name, handle) VALUES (?, ?)`,
    [name, handle],
    function (err) {
      if (err) return callback(err);
      callback(null, this.lastID);
    }
  );
};

const getUsersWithImages = (callback) => {
  const query = `
    SELECT users.name, users.handle, GROUP_CONCAT(images.filename) as images
    FROM users
    JOIN images ON users.id = images.user_id
    GROUP BY users.id
  `;
  db.all(query, [], callback);
};

module.exports = { insertUser, getUsersWithImages };
