const express = require("express");
const stockController = require("../controllers/stockController");

const router = express.Router();

router.post("/", stockController.createStock);
router.get("/:id", stockController.getStockById);
router.put("/:id", stockController.updateStock);
router.delete("/:id", stockController.deleteStock);
router.get("/", stockController.getAllStocks);

module.exports = router;