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
