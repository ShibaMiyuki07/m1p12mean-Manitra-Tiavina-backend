const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// Routes pour les utilisateurs
router.post("/", productController.createProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/", productController.getAllProduct);
router.get("/with/stocks", productController.getAllProductWithStock);
router.get("/with/stocks/:id", productController.getProductByIdWithStock);
router.get("/grouped/category", productController.getGroupedProducts);

module.exports = router;