const serviceService = require("../services/serviceService");

const createService = async (req, res) => {
    try {
        const reservation = await serviceService.createService(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getServiceById = async (req, res) => {
    try {
        const reservation = await serviceService.findServiceById(req.params.id);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateService = async (req, res) => {
    try {
        const reservation = await serviceService.updateService(req.params.id, req.body);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteService = async (req, res) => {
    try {
        const user = await serviceService.deleteService(req.params.id);
        res.status(200).json({ message: "Service supprimé avec succès", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllService = async (req, res) => {
    try {
        const reservations = await serviceService.findAllServices();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function getGroupedServices(req, res) {
    try {
        const groupedServices = await serviceService.getServicesGroupedByCategory();
        res.status(200).json({
            success: true,
            data: groupedServices
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createService,
    getServiceById,
    updateService,
    deleteService,
    getAllService,
    getGroupedServices
};