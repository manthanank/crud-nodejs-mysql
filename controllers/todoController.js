const Todo = require("../models/todo");

exports.getAllTodos = function (req, res) {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const sortField = req.query.sortField || "id";
  const sortOrder = req.query.sortOrder || "ASC";
  const keyword = req.query.keyword || "";

  Todo.getAllTodos(
    limit,
    offset,
    sortField,
    sortOrder,
    keyword,
    (err, todos) => {
      if (err) throw err;
      res.json(todos);
    }
  );
};

exports.getTodoById = function (req, res) {
  Todo.getTodoById(req.params.id, (err, todo) => {
    if (err) throw err;
    res.json(todo);
  });
};

exports.createTodo = function (req, res) {
  const newTodo = {
    title: req.body.title,
    completed: req.body.completed,
    user_id: req.body.user_id,
    category_id: req.body.category_id,
  };

  Todo.createTodo(newTodo, (err, result) => {
    if (err) throw err;
    res.json({ message: "Todo created successfully" });
  });
};

exports.updateTodo = function (req, res) {
  const updatedTodo = {
    title: req.body.title,
    completed: req.body.completed,
    user_id: req.body.user_id,
    category_id: req.body.category_id,
  };

  Todo.updateTodo(req.params.id, updatedTodo, (err, result) => {
    if (err) throw err;
    res.json({ message: "Todo updated successfully" });
  });
};

exports.deleteTodo = function (req, res) {
  Todo.deleteTodo(req.params.id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Todo deleted successfully" });
  });
};
