const db = require("../config/database");

exports.getAllTodoDetails = function (callback) {
  db.query("SELECT * FROM todo_details", callback);
};

exports.getTodoDetailById = function (id, callback) {
  db.query("SELECT * FROM todo_details WHERE id = ?", [id], callback);
};
