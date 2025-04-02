const express = require("express");
const utilController = require("../controllers/utilController");
const {upload} = require("../services/utilService");

const router = express.Router();

// Routes pour les utilisateurs
router.post("/image-upload",upload.single('image'), utilController.uploadFile);

module.exports = router;