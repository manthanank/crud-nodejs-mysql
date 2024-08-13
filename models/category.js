const db = require("../config/database");

exports.getAllCategories = function (callback) {
  db.query("SELECT * FROM categories", callback);
};

exports.getCategoryById = function (id, callback) {
  db.query("SELECT * FROM categories WHERE id = ?", [id], callback);
};

exports.createCategory = function (newCategory, callback) {
  db.query("INSERT INTO categories SET ?", newCategory, callback);
};

exports.updateCategory = function (id, updatedCategory, callback) {
  db.query(
    "UPDATE categories SET ? WHERE id = ?",
    [updatedCategory, id],
    callback
  );
};

exports.deleteCategory = function (id, callback) {
  db.query("DELETE FROM categories WHERE id = ?", [id], callback);
};
