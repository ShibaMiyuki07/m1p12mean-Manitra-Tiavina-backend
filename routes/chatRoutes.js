const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();

// Routes pour les utilisateurs
router.post("/", chatController.addMessage);
router.get("/receiver/:id", chatController.getMessageByReceiver);
router.get("/sender/:id", chatController.getMessageBySender);
router.get("/messages/:receiver/:sender", chatController.getAllMessage);

module.exports = router;