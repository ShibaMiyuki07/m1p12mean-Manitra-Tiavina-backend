const mongoose = require("mongoose");
const { Schema } = mongoose;

// Définir le schéma de l'utilisateur
const stockSchema = new mongoose.Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        stockQuantity: {
            type: Number,
            required: false,
        },
        threshold: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true, // Ajoute automatiquement createdAt et updatedAt
    }
);

// Exporter le modèle
module.exports = mongoose.model("Stock", stockSchema);