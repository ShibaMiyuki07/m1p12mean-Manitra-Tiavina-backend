const productService = require("../services/productService");

const createProduct = async (req, res) => {
    try {
        const reservation = await productService.createProduct(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const reservation = await productService.findProductById(req.params.id);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const reservation = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const user = await productService.deleteProduct(req.params.id);
        res.status(200).json({ message: "Utilisateur supprimé avec succès", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const reservations = await productService.findAllProducts();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllProductWithStock = async (req, res) => {
    try {
        const reservations = await productService.findAllProductWithStock();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getAllProductWithStock,
};