const express = require("express");
const router = express.Router();
const todoDetailController = require("../controllers/todoDetailController");

// Routes
router.get("/", todoDetailController.getAllTodoDetails);
router.get("/:id", todoDetailController.getTodoDetailById);

module.exports = router;
