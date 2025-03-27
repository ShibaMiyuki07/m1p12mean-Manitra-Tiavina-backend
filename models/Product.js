const mongoose = require("mongoose");
const { Schema } = mongoose;

// Définir le schéma de l'utilisateur
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Ajoute automatiquement createdAt et updatedAt
    }
);

// Exporter le modèle
module.exports = mongoose.model("Product", productSchema);