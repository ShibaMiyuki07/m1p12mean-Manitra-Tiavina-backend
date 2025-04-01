const mongoose = require("mongoose");
const { Schema } = mongoose;

const promotionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        products: [{
            type: Schema.Types.ObjectId,
            ref: "Product",
        }],
        services: [{
            type: Schema.Types.ObjectId,
            ref: "Service",
        }],
        validFrom: {
            type: Date,
            required: true,
        },
        validUntil: {
            type: Date,
            required: true,
            validate: {
                validator: function(value) {
                    return value > this.validFrom;
                },
                message: "La date de fin doit être postérieure à la date de début",
            },
        },
    },
    {
        timestamps: true,
    }
);

// Index pour les promotions actives
promotionSchema.index({ validFrom: 1, validUntil: 1 });

module.exports = mongoose.model("Promotion", promotionSchema);