const Promotion = require("../models/Promotion");
const Product = require("../models/Product");
const Service = require("../models/Service");

class PromotionService {
    // Créer une nouvelle promotion
    static async createPromotion(promotionData) {
        // Vérifier que les produits et services existent
        if (promotionData.products && promotionData.products.length > 0) {
            const products = await Product.find({ _id: { $in: promotionData.products } });
            if (products.length !== promotionData.products.length) {
                throw new Error("Certains produits n'existent pas");
            }
        }

        if (promotionData.services && promotionData.services.length > 0) {
            const services = await Service.find({ _id: { $in: promotionData.services } });
            if (services.length !== promotionData.services.length) {
                throw new Error("Certains services n'existent pas");
            }
        }

        const promotion = new Promotion(promotionData);
        return await promotion.save();
    }

    // Récupérer toutes les promotions
    static async getAllPromotions() {
        return await Promotion.find()
            .populate("products", "name price category image")
            .populate("services", "name price duration category image");
    }

    // Récupérer une promotion par son ID
    static async getPromotionById(id) {
        return await Promotion.findById(id)
            .populate("products", "name price category image")
            .populate("services", "name price duration category image");
    }

    // Mettre à jour une promotion
    static async updatePromotion(id, updateData) {
        // Vérifier que les nouveaux produits et services existent
        if (updateData.products) {
            const products = await Product.find({ _id: { $in: updateData.products } });
            if (products.length !== updateData.products.length) {
                throw new Error("Certains produits n'existent pas");
            }
        }

        if (updateData.services) {
            const services = await Service.find({ _id: { $in: updateData.services } });
            if (services.length !== updateData.services.length) {
                throw new Error("Certains services n'existent pas");
            }
        }

        return await Promotion.findByIdAndUpdate(id, updateData, { new: true })
            .populate("products", "name price")
            .populate("services", "name price duration");
    }

    // Supprimer une promotion
    static async deletePromotion(id) {
        return await Promotion.findByIdAndDelete(id);
    }

    // Récupérer les promotions actives
    static async getActivePromotions() {
        const now = new Date();
        return await Promotion.find({
            validFrom: { $lte: now },
            validUntil: { $gte: now },
        })
            .populate("products", "name price category image")
            .populate("services", "name price duration category image");
    }

    // Vérifier si un produit est en promotion
    static async isProductInPromotion(productId) {
        const now = new Date();
        return await Promotion.findOne({
            products: productId,
            validFrom: { $lte: now },
            validUntil: { $gte: now },
        });
    }

    // Vérifier si un service est en promotion
    static async isServiceInPromotion(serviceId) {
        const now = new Date();
        return await Promotion.findOne({
            services: serviceId,
            validFrom: { $lte: now },
            validUntil: { $gte: now },
        });
    }
}

module.exports = PromotionService;