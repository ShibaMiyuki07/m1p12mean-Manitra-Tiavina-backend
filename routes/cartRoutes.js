const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { check } = require('express-validator');

// Routes
router.get('/', cartController.getUserCart);
router.post('/products', [
    check('productId').isMongoId().withMessage('ID produit invalide'),
    check('quantity').optional().isInt({ min: 1 }).withMessage('Quantité doit être au moins 1')
], cartController.addProduct);
router.post('/services', [
    check('serviceId').isMongoId().withMessage('ID service invalide'),
    check('date').isISO8601().toDate().withMessage('Date invalide')
], cartController.addService);
router.put('/products', [
    check('productId').isMongoId().withMessage('ID produit invalide'),
    check('quantity').isInt({ min: 1 }).withMessage('Quantité doit être au moins 1')
], cartController.updateProductQuantity);
router.put('/services', [
    check('serviceId').isMongoId().withMessage('ID service invalide')
], cartController.updateServiceDate);
router.delete('/items/:itemId', cartController.removeItem);
router.delete('/clear', cartController.clearCart);
router.post('/checkout', cartController.checkout);
router.get('/history', cartController.getOrderHistory);
router.put('/update/:id',cartController.updateCart);

module.exports = router;