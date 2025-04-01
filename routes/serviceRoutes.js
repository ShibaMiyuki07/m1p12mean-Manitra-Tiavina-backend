const express = require("express");
const serviceController = require("../controllers/serviceController");

const router = express.Router();

// Routes pour les utilisateurs
router.post("/", serviceController.createService);
router.get("/:id", serviceController.getServiceById);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);
router.get("/", serviceController.getAllService);
router.get("/grouped/category", serviceController.getGroupedServices);

module.exports = router;