const CartService = require('../services/cartService');
const { validationResult } = require('express-validator');

exports.getUserCart = async (req, res) => {
    try {
        const cart = await CartService.getOrCreateUserCart(req.user._id);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const cart = await CartService.addProductToCart(
            req.user._id,
            req.body.productId,
            req.body.quantity || 1
        );
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addService = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const cart = await CartService.addServiceToCart(
            req.user._id,
            req.body.serviceId,
            req.body.date
        );
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProductQuantity = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const cart = await CartService.updateProductQuantity(
            req.user._id,
            req.body.productId,
            req.body.quantity
        );
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const cart = await CartService.updateCart(req.params.id, req.body);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateServiceDate = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const cart = await CartService.updateServiceDate(
            req.user._id,
            req.body.serviceId,
            req.body.date
        );
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeItem = async (req, res) => {
    try {
        await CartService.removeCartItem(
            req.user._id,
            req.params.itemId,
            req.query.type === 'product'
        );
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        await CartService.clearCart(req.user._id);
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.checkout = async (req, res) => {
    try {
        const order = await CartService.checkoutCart(req.user._id);
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOrderHistory = async (req, res) => {
    try {
        const orders = await CartService.getUserOrderHistory(req.user._id);
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};