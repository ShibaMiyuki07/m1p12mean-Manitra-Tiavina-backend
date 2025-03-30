const Product = require("../models/Product");
const Reservation = require("../models/Reservation");

// Créer une reservation
const createProduct = async (productData) => {
    try {
        const product = new Product(productData);
        await product.save();
        return product;
    } catch (error) {
        throw new Error("Erreur lors de la création du nouveau produit : " + error.message);
    }
};

// Trouver un utilisateur par son ID
const findProductById = async (productId) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Produit non trouvé");
        }
        return product;
    } catch (error) {
        throw new Error("Erreur lors de la recherche du produit : " + error.message);
    }
};

// Mettre à jour une reservation
const updateProduct = async (productId, updateData) => {
    try {
        const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        if (!product) {
            throw new Error("Produit non trouvé");
        }
        return product;
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du produit : " + error.message);
    }
};

// Supprimer une reservation
const deleteProduct= async (productId) => {
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            throw new Error("Produit non trouvé");
        }
        return product;
    } catch (error) {
        throw new Error("Erreur lors de la suppression du produit : " + error.message);
    }
};

// Lister tous les reservations
const findAllProducts= async () => {
    try {
        return await Product.find();
    } catch (error) {
        throw new Error("Erreur lors de la récupération des produits : " + error.message);
    }
};

const findAllProductWithStock= async () => {
    try {
        return await Product.aggregate([
            {
                $lookup: {
                    from: 'stocks',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'result'
                }
            },
            {
                $unwind: {
                    path: '$result',
                    includeArrayIndex: 'string',
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);
    } catch (error) {
        throw new Error("Erreur lors de la récupération des reservations : " + error.message);
    }
};

module.exports = {
    createProduct,
    findProductById,
    updateProduct,
    deleteProduct,
    findAllProducts,
    findAllProductWithStock
};