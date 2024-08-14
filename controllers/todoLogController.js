const TodoLog = require("../models/todoLog");

exports.getAllTodoLogs = function (req, res) {
  TodoLog.getAllTodoLogs((err, logs) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(logs);
  });
};

exports.getTodoLogById = function (req, res) {
  TodoLog.getTodoLogById(req.params.id, (err, log) => {
    if (err) return res.status(500).json({ error: err.message });
    if (log.length === 0)
      return res.status(404).json({ message: "Todo Log not found" });
    res.json(log[0]);
  });
};

exports.createTodoLog = function (req, res) {
  const newLog = {
    todo_id: req.body.todo_id,
    action: req.body.action,
  };

  TodoLog.createTodoLog(newLog, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "Todo Log created successfully", id: result.insertId });
  });
};

exports.deleteTodoLog = function (req, res) {
  TodoLog.deleteTodoLog(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Todo Log not found" });
    res.json({ message: "Todo Log deleted successfully" });
  });
};
