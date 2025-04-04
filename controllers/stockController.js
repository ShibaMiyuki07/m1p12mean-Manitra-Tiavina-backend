const stockService = require("../services/stockService");

const createStock = async (req, res) => {
    try {
        const reservation = await stockService.createStock(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getStockById = async (req, res) => {
    try {
        const reservation = await stockService.findStockById(req.params.id);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateStock = async (req, res) => {
    try {
        const reservation = await stockService.updateStock(req.params.id, req.body);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteStock = async (req, res) => {
    try {
        const stock = await stockService.deleteStock(req.params.id);
        res.status(200).json({ message: "stock supprimé avec succès", stock });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllStocks = async (req, res) => {
    try {
        const stocks = await stockService.findAllStock();
        res.status(200).json(stocks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    createStock,
    getStockById,
    updateStock,
    deleteStock,
    getAllStocks,
};