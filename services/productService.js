const Product = require("../models/Product");
const Reservation = require("../models/Reservation");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

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
        throw new Error("Erreur lors de la récupération des productions avec leur stock : " + error.message);
    }
};

const findProductByIdWithStock= async (productId) => {
    try {
        return await Product.aggregate([
            {
                $match:
                    {
                        _id: new ObjectId(productId),
                    }
            },
            {
                $lookup: {
                    from: "stocks",
                    localField: "_id",
                    foreignField: "productId",
                    as: "result"
                }
            },
            {
                $unwind: {
                    path: "$result",
                    includeArrayIndex: "string",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);
    }
    catch (e) {
        throw new Error("Erreur lors de la récupération des productions avec son stock : " + error.message);
    }
}

async function getProductsGroupedByCategory() {
    try {
        const results = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    products: {
                        $push: {
                            _id: "$_id",
                            name: "$name",
                            description: "$description",
                            price: "$price",
                            image: "$image",
                            createdAt: "$createdAt",
                            updatedAt: "$updatedAt"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        return results.map(group => ({
            category: group._id,
            products: group.products,
            productCount: group.count
        }));

    } catch (error) {
        throw new Error(`Erreur lors du regroupement des produits: ${error.message}`);
    }
}

module.exports = {
    createProduct,
    findProductById,
    updateProduct,
    deleteProduct,
    findAllProducts,
    findAllProductWithStock,
    findProductByIdWithStock,
    getProductsGroupedByCategory
};