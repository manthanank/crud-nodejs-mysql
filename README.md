# CRUD Node.js Application with MySQL

This project is a simple CRUD application built with Node.js, Express, and MySQL. It includes APIs for managing `users`, `todos` and `categories`.

## Project Setup Instructions

### Prerequisites

- Node.js
- MySQL

### Clone the Repository

```bash
git clone https://github.com/manthanank/crud-nodejs-mysql.git
cd crud-nodejs-mysql
```

### Install Dependencies

```bash
npm install
```

### Create the Database and Tables

1. **Create the database**:

   ```sql
   CREATE DATABASE your_database;
   ```

2. **Run SQL scripts to create the tables**:

   **`create_tables.sql`**:

   ```sql
   -- Create users table
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create categories table
    CREATE TABLE categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL
    );

    -- Create todos table
    CREATE TABLE todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT FALSE,
        user_id INT,
        category_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
    );

    -- Create todo_logs table
    CREATE TABLE todo_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        todo_id INT,
        action VARCHAR(50),
        action_time TIMESTAMP,
        FOREIGN KEY (todo_id) REFERENCES todos(id)
    );

    -- Create a view for todo details
    CREATE VIEW todo_details AS
    SELECT todos.id, todos.title, todos.completed, users.username, categories.name AS category_name
    FROM todos
    JOIN users ON todos.user_id = users.id
    JOIN categories ON todos.category_id = categories.id;
   ```

   Run the script in your MySQL client.

## Project Setup

### Step 1: Initializing the Project

Create a new directory for your project and initialize it with npm:

```bash
mkdir crud-nodejs
cd crud-nodejs-mysql
npm init -y
```

Install the necessary dependencies:

```bash
npm install express mysql2 dotenv body-parser
npm install --save-dev nodemon
```

### Step 2: Project Structure

Create the following project structure:

```text
crud-nodejs-mysql/
├── config
│   └── database.js
├── controllers
│   └── todoController.js
|   └── userController.js
|   └── categoryController.js
|   └── todoLogController.js
|   └── todoDetailController.js
├── middleware
│   └── errorMiddleware.js
├── models
│   └── todo.js
|   └── user.js
|   └── category.js
|   └── todoLog.js
|   └── todoDetail.js
├── routes
│   └── todoRoutes.js
|   └── userRoutes.js
|   └── categoryRoutes.js
|   └── todoLogRoutes.js
|   └── todoDetailRoutes.js
├── .env
├── .env.example
├── index.js
└── package.json
```

### Step 3: Configuring Environment Variables

Create a `.env` file (copy from `.env

.example`):

```bash
cp .env.example .env
```

Fill in your MySQL database credentials in the `.env` file:

```js
PORT=3000
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_DATABASE=your_database
```

### Step 4: Connecting to MySQL

In `config/database.js`, we set up the MySQL connection using the `mysql2` package:

```js
const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

module.exports = connection;
```

### Step 5: Creating the Express Server

In `index.js`, we configure the Express server and set up the routes and error handling middleware:

```js
const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const todoLogRoutes = require('./routes/todoLogRoutes');
const todoDetailRoutes = require('./routes/todoDetailRoutes');
const errorMiddleware = require("./middleware/errorMiddleware");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/todos", todoRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use('/todo-logs', todoLogRoutes);
app.use('/todo-details', todoDetailRoutes);

// Error middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Step 6: Defining the Models

In `models/todo.js`, we define the functions to interact with the MySQL database:

```js
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
```

In `models/category.js`, we define the functions to interact with the MySQL database:

```js
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
```

In `models/todoDetail.js`, we define the functions to interact with the MySQL database:

```js
const db = require("../config/database");

exports.getAllTodoDetails = function (callback) {
  db.query("SELECT * FROM todo_details", callback);
};

exports.getTodoDetailById = function (id, callback) {
  db.query("SELECT * FROM todo_details WHERE id = ?", [id], callback);
};
```

In `models/todoLog.js`, we define the functions to interact with the MySQL database:

```js
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
```

In `models/user.js`, we define the functions to interact with the MySQL database:

```js
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
```

### Step 7: Creating the Controller

In `controllers/todoController.js`, we define the logic for handling CRUD operations:

```js
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
```

In `controllers/categoryController.js`, we define the logic for handling CRUD operations:

```js
const Category = require("../models/category");

exports.getAllCategories = function (req, res) {
  Category.getAllCategories((err, categories) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(categories);
  });
};

exports.getCategoryById = function (req, res) {
  Category.getCategoryById(req.params.id, (err, category) => {
    if (err) return res.status(500).json({ error: err.message });
    if (category.length === 0)
      return res.status(404).json({ message: "Category not found" });
    res.json(category[0]);
  });
};

exports.createCategory = function (req, res) {
  const newCategory = {
    name: req.body.name,
  };

  Category.createCategory(newCategory, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "Category created successfully", id: result.insertId });
  });
};

exports.updateCategory = function (req, res) {
  const updatedCategory = {
    name: req.body.name,
  };

  Category.updateCategory(req.params.id, updatedCategory, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category updated successfully" });
  });
};

exports.deleteCategory = function (req, res) {
  Category.deleteCategory(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  });
};
```

In `controllers/todoDetailController.js`, we define the logic for handling CRUD operations:

```js
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
```

In `controllers/todoLogController.js`, we define the logic for handling CRUD operations:

```js
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
```

In `controllers/userController.js`, we define the logic for handling CRUD operations:

```js
const User = require("../models/user");

exports.getAllUsers = function (req, res) {
  User.getAllUsers((err, users) => {
    if (err) throw err;
    res.json(users);
  });
};

exports.getUserById = function (req, res) {
  User.getUserById(req.params.id, (err, user) => {
    if (err) throw err;
    res.json(user);
  });
};

exports.createUser = function (req, res) {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
  };

  User.createUser(newUser, (err, result) => {
    if (err) throw err;
    res.json({ message: "User created successfully" });
  });
};

exports.updateUser = function (req, res) {
  const updatedUser = {
    username: req.body.username,
    email: req.body.email,
  };

  User.updateUser(req.params.id, updatedUser, (err, result) => {
    if (err) throw err;
    res.json({ message: "User updated successfully" });
  });
};

exports.deleteUser = function (req, res) {
  User.deleteUser(req.params.id, (err, result) => {
    if (err) throw err;
    res.json({ message: "User deleted successfully" });
  });
};
```

### Step 8: Defining Routes

In `routes/todoRoutes.js`, we set up the routes for the Todo API:

```js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Routes
router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
```

In `routes/categoryRoutes.js`, we set up the routes for the Category API:

```js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
```

In `routes/todoDetailRoutes.js`, we set up the routes for the Todo Detail API:

```js
const express = require("express");
const router = express.Router();
const todoDetailController = require("../controllers/todoDetailController");

// Routes
router.get("/", todoDetailController.getAllTodoDetails);
router.get("/:id", todoDetailController.getTodoDetailById);

module.exports = router;
```

In `routes/todoLogRoutes.js`, we set up the routes for the Todo Log API:

```js
const express = require("express");
const router = express.Router();
const todoLogController = require("../controllers/todoLogController");

// Routes
router.get("/", todoLogController.getAllTodoLogs);
router.get("/:id", todoLogController.getTodoLogById);
router.post("/", todoLogController.createTodoLog);
router.delete("/:id", todoLogController.deleteTodoLog);

module.exports = router;
```

In `routes/userRoutes.js`, we set up the routes for the User API:

```js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
```

### Step 9: Error Handling Middleware

In `middleware/errorMiddleware.js`, we define a simple error handling middleware:

```js
module.exports = function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};
```

### Step 10: Running the Application

Add the following scripts to `package.json`:

```js
{
  "name": "crud-nodejs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.20.2",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mysql2": "^3.9.7",
    "nodemon": "^3.1.0"
  }
}
```

### Start the Application

To start the application in development mode:

```bash
npm run dev
```

For production mode:

```bash
npm start
```

## API Endpoints

### Users

#### 1. Get All Users

- **Method**: `GET`
- **URL**: `/users`

#### 2. Get User by ID

- **Method**: `GET`
- **URL**: `/users/:id`

#### 3. Create User

- **Method**: `POST`
- **URL**: `/users`
- **Request Body**:

  ```json
  {
    "username": "john_doe",
    "email": "john@example.com"
  }
  ```

#### 4. Update User

- **Method**: `PUT`
- **URL**: `/users/:id`
- **Request Body**:

  ```json
  {
    "username": "john_doe_updated",
    "email": "john_updated@example.com"
  }
  ```

#### 5. Delete User

- **Method**: `DELETE`
- **URL**: `/users/:id`

### Todos

#### 1. Get All Todos

- **Method**: `GET`
- **URL**: `/todos`

#### 2. Get Todo by ID

- **Method**: `GET`
- **URL**: `/todos/:id`

#### 3. Create Todo

- **Method**: `POST`
- **URL**: `/todos`
- **Request Body**:

  ```json
  {
      "title": "Buy groceries",
      "completed": false,
      "user_id": 1,
      "category_id": 2
  }
  ```

#### 4. Update Todo

- **Method**: `PUT`
- **URL**: `/todos/:id`
- **Request Body**:

  ```json
  {
      "title": "Buy groceries and cook dinner",
      "completed": true,
      "user_id": 1,
      "category_id": 2
  }
  ```

#### 5. Delete Todo

- **Method**: `DELETE`
- **URL**: `/todos/:id`

### Todo Logs

#### 1. Get All Todo Logs

- **Method**: `GET`
- **URL**: `/todo-logs`

#### 2. Get Todo Log by ID

- **Method**: `GET`
- **URL**: `/todo-logs/:id`

#### 3. Create Todo Log

- **Method**: `POST`
- **URL**: `/todo-logs`
- **Request Body**:

  ```json
  {
      "todo_id": 1,
      "action": "Updated"
  }
  ```

#### 4. Delete Todo Log

- **Method**: `DELETE`
- **URL**: `/todo-logs/:id`

### Todo Details

#### 1. Get All Todo Details

- **Method**: `GET`
- **URL**: `/todo-details`

#### 2. Get Todo Detail by ID

- **Method**: `GET`
- **URL**: `/todo-details/:id`

### Categories

#### 1. Get All Categories

- **Method**: `GET`
- **URL**: `/categories`

#### 2. Get Category by ID

- **Method**: `GET`
- **URL**: `/categories/:id`

#### 3. Create Category

- **Method**: `POST`
- **URL**: `/categories`
- **Request Body**:

  ```json
  {
      "name": "Health"
  }
  ```

#### 4. Update Category

- **Method**: `PUT`
- **URL**: `/categories/:id`
- **Request Body**:

  ```json
  {
      "name": "Wellness"
  }
  ```

#### 5. Delete Category

- **Method**: `DELETE`
- **URL**: `/categories/:id`

## Error Handling

The application uses a basic error handling middleware that returns a 500 status code and an error message for any unexpected errors.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to contribute to this project by creating issues or pull requests.

## Contact

For any questions or issues, please contact [manthan.ank46@gmail.com](mailto:manthan.ank46@gmail.com).

Replace placeholders like `your-username`, `your_user`, `your_password`, and `your_database` with your actual values. Adjust the email address and any other project-specific details as necessary.

### Postman Documentation

- [Postman Documentation](https://documenter.getpostman.com/view/16684062/2sA3s6Ep9v)

### Test the APIs

You can test the APIs using Postman or any other API testing tool.

## Conclusion

That's it! You have successfully set up a CRUD Node.js application with MySQL. You can now use this project as a starting point for building your own Node.js applications with MySQL.
