const express = require("express");
const router = express.Router();
const promotionController = require("../controllers/promotionController");
const { check } = require("express-validator");

const promotionValidationRules = [
    check("name").notEmpty().withMessage("Le nom est requis"),
    check("description").notEmpty().withMessage("La description est requise"),
    check("discount")
        .isInt({ min: 1, max: 100 })
        .withMessage("La réduction doit être entre 1 et 100%"),
    check("validFrom").isISO8601().toDate().withMessage("Date de début invalide"),
    check("validUntil").isISO8601().toDate().withMessage("Date de fin invalide"),
];

// Routes
router.post("/", promotionValidationRules, promotionController.createPromotion);
router.get("/", promotionController.getAllPromotions);
router.get("/active", promotionController.getActivePromotions);
router.get("/:id", promotionController.getPromotionById);
router.put("/:id", promotionValidationRules, promotionController.updatePromotion);
router.delete("/:id", promotionController.deletePromotion);
router.get("/check/product/:productId", promotionController.checkProductPromotion);
router.get("/check/service/:serviceId", promotionController.checkServicePromotion);

module.exports = router;