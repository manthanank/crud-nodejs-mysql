const express = require("express");
const router = express.Router();
const todoLogController = require("../controllers/todoLogController");

// Routes
router.get("/", todoLogController.getAllTodoLogs);
router.get("/:id", todoLogController.getTodoLogById);
router.post("/", todoLogController.createTodoLog);
router.delete("/:id", todoLogController.deleteTodoLog);

module.exports = router;
