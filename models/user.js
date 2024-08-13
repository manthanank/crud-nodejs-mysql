const db = require("../config/database");

// Fetch all users
exports.getAllUsers = function (callback) {
  db.query("SELECT * FROM users", callback);
};

// Fetch a user by ID
exports.getUserById = function (id, callback) {
  db.query("SELECT * FROM users WHERE id = ?", [id], callback);
};

// Create a new user
exports.createUser = function (newUser, callback) {
  db.query("INSERT INTO users SET ?", newUser, callback);
};

// Update a user by ID
exports.updateUser = function (id, updatedUser, callback) {
  db.query("UPDATE users SET ? WHERE id = ?", [updatedUser, id], callback);
};

// Delete a user by ID
exports.deleteUser = function (id, callback) {
  db.query("DELETE FROM users WHERE id = ?", [id], callback);
};
