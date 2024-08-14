const TodoDetail = require("../models/todoDetail");

exports.getAllTodoDetails = function (req, res) {
  TodoDetail.getAllTodoDetails((err, details) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(details);
  });
};

exports.getTodoDetailById = function (req, res) {
  TodoDetail.getTodoDetailById(req.params.id, (err, detail) => {
    if (err) return res.status(500).json({ error: err.message });
    if (detail.length === 0)
      return res.status(404).json({ message: "Todo Detail not found" });
    res.json(detail[0]);
  });
};
