const mongoose = require("mongoose");

// Définir le schéma de l'utilisateur
const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
            enum: ["client", "mecanicien", "manager"], // Rôles possibles
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profile: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            address: { type: String },
            phone: { type: String },
            photo: { type: String },
        },
    },
    {
        timestamps: true, // Ajoute automatiquement createdAt et updatedAt
    }
);

// Exporter le modèle
module.exports = mongoose.model("User", userSchema);