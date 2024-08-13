const db = require("../config/database");

// Fetch todos with associated user and category information
exports.getAllTodos = function (
  limit,
  offset,
  sortField,
  sortOrder,
  keyword,
  callback
) {
  const query = `
        SELECT todos.*, users.username, categories.name AS category_name
        FROM todos
        LEFT JOIN users ON todos.user_id = users.id
        LEFT JOIN categories ON todos.category_id = categories.id
        WHERE todos.title LIKE ?
        ORDER BY ${sortField} ${sortOrder}
        LIMIT ? OFFSET ?
    `;
  db.query(query, [`%${keyword}%`, limit, offset], callback);
};

// Fetch a single todo by ID
exports.getTodoById = function (id, callback) {
  const query = `
        SELECT todos.*, users.username, categories.name AS category_name
        FROM todos
        LEFT JOIN users ON todos.user_id = users.id
        LEFT JOIN categories ON todos.category_id = categories.id
        WHERE todos.id = ?
    `;
  db.query(query, [id], callback);
};

// Insert a new todo with user and category
exports.createTodo = function (newTodo, callback) {
  const query = "INSERT INTO todos SET ?";
  db.query(query, newTodo, callback);
};

// Update a todo by ID
exports.updateTodo = function (id, updatedTodo, callback) {
  db.query("UPDATE todos SET ? WHERE id = ?", [updatedTodo, id], callback);
};

// Delete a todo by ID
exports.deleteTodo = function (id, callback) {
  db.query("DELETE FROM todos WHERE id = ?", [id], callback);
};
