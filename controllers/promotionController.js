const PromotionService = require("../services/promotionService");
const { validationResult } = require("express-validator");

const createPromotion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const promotion = await PromotionService.createPromotion(req.body);
        res.status(201).json(promotion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllPromotions = async (req, res) => {
    try {
        const promotions = await PromotionService.getAllPromotions();
        res.json(promotions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPromotionById = async (req, res) => {
    try {
        const promotion = await PromotionService.getPromotionById(req.params.id);
        if (!promotion) {
            return res.status(404).json({ message: "Promotion non trouvée" });
        }
        res.json(promotion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePromotion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const promotion = await PromotionService.updatePromotion(req.params.id, req.body);
        if (!promotion) {
            return res.status(404).json({ message: "Promotion non trouvée" });
        }
        res.json(promotion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePromotion = async (req, res) => {
    try {
        const promotion = await PromotionService.deletePromotion(req.params.id);
        if (!promotion) {
            return res.status(404).json({ message: "Promotion non trouvée" });
        }
        res.json({ message: "Promotion supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getActivePromotions = async (req, res) => {
    try {
        const promotions = await PromotionService.getActivePromotions();
        res.json(promotions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const checkProductPromotion = async (req, res) => {
    try {
        const promotion = await PromotionService.isProductInPromotion(req.params.productId);
        res.json({ isInPromotion: !!promotion, promotion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const checkServicePromotion = async (req, res) => {
    try {
        const promotion = await PromotionService.isServiceInPromotion(req.params.serviceId);
        res.json({ isInPromotion: !!promotion, promotion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPromotion,
    getAllPromotions,
    getPromotionById,
    updatePromotion,
    deletePromotion,
    getActivePromotions,
    checkProductPromotion,
    checkServicePromotion
};