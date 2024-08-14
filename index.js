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
