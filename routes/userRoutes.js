const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Routes pour les utilisateurs
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/", userController.getAllUsers);

module.exports = router;