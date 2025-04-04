const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    },
    quantity: {
        type: Number,
        required: function() { return this.productId !== undefined; },
        min: 1
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: false
    },
    date: {
        type: Date,
        required: function() { return this.serviceId !== undefined; }
    }
}, { _id: false });

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [cartItemSchema],
    services: [cartItemSchema],
    status: {
        type: String,
        enum: ['pending', 'completed', 'abandoned'],
        default: 'pending'
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

// Index pour améliorer les performances
cartSchema.index({ userId: 1, status: 1 });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;