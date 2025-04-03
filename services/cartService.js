const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Service = require('../models/Service');

class CartService {
    // Créer ou récupérer le panier d'un utilisateur
    static async getOrCreateUserCart(userId) {
        let cart = await Cart.findOne({ userId, status: 'pending' })
            .populate('products.productId', 'name price image')
            .populate('services.serviceId', 'name price duration image');

        if (!cart) {
            cart = new Cart({ userId, products: [], services: [] });
            await cart.save();
        }

        return cart;
    }

    // Ajouter un produit au panier
    static async addProductToCart(userId, productId, quantity = 1) {
        const product = await Product.findById(productId);
        if (!product) throw new Error('Produit non trouvé');

        const cart = await this.getOrCreateUserCart(userId);

        const existingProduct = cart.products.find(item =>
            item.productId && item.productId.equals(productId)
        );

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        return cart.save();
    }

    // Ajouter un service au panier
    static async addServiceToCart(userId, serviceId, date) {
        const service = await Service.findById(serviceId);
        if (!service) throw new Error('Service non trouvé');

        const cart = await this.getOrCreateUserCart(userId);

        // Vérifier si le service existe déjà à la même date
        const existingService = cart.services.find(item =>
            item.serviceId && item.serviceId.equals(serviceId) &&
            new Date(item.date).getTime() === new Date(date).getTime()
        );

        if (!existingService) {
            cart.services.push({ serviceId, date });
        }

        return cart.save();
    }

    // Mettre à jour la quantité d'un produit
    static async updateProductQuantity(userId, productId, quantity) {
        if (quantity < 1) throw new Error('La quantité doit être au moins 1');

        const cart = await Cart.findOne({ userId, status: 'pending' });
        if (!cart) throw new Error('Panier non trouvé');

        const productItem = cart.products.find(item =>
            item.productId && item.productId.equals(productId)
        );
        if (!productItem) throw new Error('Produit non trouvé dans le panier');

        productItem.quantity = quantity;
        return await cart.save();
    }

    static async updateServiceDate(userId, serviceId, date) {

        const cart = await Cart.findOne({ userId, status: 'pending' });
        if (!cart) throw new Error('Panier non trouvé');

        const productItem = cart.products.find(item =>
            item.productId && item.productId.equals(serviceId)
        );
        if (!productItem) throw new Error('Service non trouvé dans le panier');

        productItem.date = date;
        return await cart.save();
    }

    // Supprimer un élément du panier
    static async removeCartItem(userId, itemId, isProduct) {
        const cart = await Cart.findOne({ userId, status: 'pending' });
        if (!cart) throw new Error('Panier non trouvé');

        if (isProduct) {
            cart.products = cart.products.filter(
                item => !item._id.equals(itemId));
        } else {
            cart.services = cart.services.filter(
                item => !item._id.equals(itemId));
        }

        return await cart.save();
    }

    // Vider le panier
    static async clearCart(userId) {
        return Cart.findOneAndUpdate(
            {userId, status: 'pending'},
            {$set: {products: [], services: []}},
            {new: true}
        );
    }

    // Finaliser le panier
    static async checkoutCart(userId) {
        return Cart.findOneAndUpdate(
            {userId, status: 'pending'},
            {$set: {status: 'completed'}},
            {new: true}
        );
    }

    // Récupérer l'historique des commandes
    static async getUserOrderHistory(userId) {
        return await Cart.find({ userId, status: 'completed' })
            .sort({ createdAt: -1 })
            .populate('products.productId', 'name price image')
            .populate('services.serviceId', 'name price duration image');
    }
}

module.exports = CartService;