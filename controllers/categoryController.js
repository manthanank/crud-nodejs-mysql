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
