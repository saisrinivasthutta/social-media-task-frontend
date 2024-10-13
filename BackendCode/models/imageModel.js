const db = require("../db/database");

const insertImages = (images, callback) => {
  const placeholders = images.map(() => "(?, ?, ?)").join(", ");
  const values = images.flatMap((image) => [
    image.userId,
    image.filename,
    image.filepath,
  ]);

  db.run(
    `INSERT INTO images (user_id, filename, filepath) VALUES ${placeholders}`,
    values,
    callback
  );
};

const deleteAllImages = (callback) => {
  db.run(`DELETE FROM images`, callback);
};

module.exports = { insertImages, deleteAllImages };
