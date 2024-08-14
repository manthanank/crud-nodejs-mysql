const db = require("../config/database");

exports.getAllTodoLogs = function (callback) {
  db.query("SELECT * FROM todo_logs", callback);
};

exports.getTodoLogById = function (id, callback) {
  db.query("SELECT * FROM todo_logs WHERE id = ?", [id], callback);
};

exports.createTodoLog = function (newLog, callback) {
  db.query("INSERT INTO todo_logs SET ?", newLog, callback);
};

exports.deleteTodoLog = function (id, callback) {
  db.query("DELETE FROM todo_logs WHERE id = ?", [id], callback);
};
