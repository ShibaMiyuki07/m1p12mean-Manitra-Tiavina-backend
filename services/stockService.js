const Stock = require("../models/Stock");

const createStock = async (userData) => {
    try {
        const stock = new Stock(userData);
        await stock.save();
        return stock;
    } catch (error) {
        throw new Error("Erreur lors de la création du stock : " + error.message);
    }
};

const findStockById = async (stockId) => {
    try {
        const stock = await Stock.findById(stockId);
        if (!stock) {
            throw new Error("Stock non trouvé");
        }
        return stock;
    } catch (error) {
        throw new Error("Erreur lors de la recherche du stock: " + error.message);
    }
};

const updateStock = async (stockId, updateData) => {
    try {
        const stock = await Stock.findByIdAndUpdate(stockId, updateData, { new: true });
        if (!stock) {
            throw new Error("Stock non trouvé");
        }
        return stock;
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du stock : " + error.message);
    }
};

const deleteStock= async (stockId) => {
    try {
        const stock = await Stock.findByIdAndDelete(stockId);
        if (!stock) {
            throw new Error("Stock non trouvé");
        }
        return stock;
    } catch (error) {
        throw new Error("Erreur lors de la suppression du stock : " + error.message);
    }
};

const findAllStock= async () => {
    try {
        return await Stock.find();
    } catch (error) {
        throw new Error("Erreur lors de la récupération des stocks : " + error.message);
    }
};

module.exports = {
    createStock,
    findAllStock,
    updateStock,
    deleteStock,
    findStockById
};