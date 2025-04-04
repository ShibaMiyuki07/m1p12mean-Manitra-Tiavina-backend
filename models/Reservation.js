const mongoose = require("mongoose");
const { Schema } = mongoose;

// Définir le schéma de l'utilisateur
const reservationSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        mechanicId: {
            type: Schema.Types.ObjectId,
            required: false,
        },
        serviceId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        endReservation: {
            type: Date,
            required: true,
        },
        reservationDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true, // Ajoute automatiquement createdAt et updatedAt
    }
);

// Exporter le modèle
module.exports = mongoose.model("Reservation", reservationSchema);