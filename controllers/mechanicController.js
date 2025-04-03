const MechanicService = require('../services/mechanicService');
const { validationResult } = require('express-validator');

exports.createMechanic = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const mechanic = await MechanicService.createMechanic(req.body);
        res.status(201).json(mechanic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.checkMechanicAvailability = async (req, res) => {
    try {
        const { mechanicId, date } = req.params;
        const isValid = await MechanicService.isDateValidForMechanic(mechanicId, date);
        res.json({ available: isValid });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.findAvailableMechanics = async (req, res) => {
    try {
        const { date } = req.params;
        const mechanics = await MechanicService.findAvailableMechanics(date);
        res.json(mechanics);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// CRUD standard
exports.getMechanic = async (req, res) => {
    try {
        const mechanic = await MechanicService.getMechanicById(req.params.id);
        if (!mechanic) return res.status(404).json({ message: 'Mechanic not found' });
        res.json(mechanic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateMechanic = async (req, res) => {
    try {
        const mechanic = await MechanicService.updateMechanic(req.params.id, req.body);
        if (!mechanic) return res.status(404).json({ message: 'Mechanic not found' });
        res.json(mechanic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMechanic = async (req, res) => {
    try {
        await MechanicService.deleteMechanic(req.params.id);
        res.json({ message: 'Mechanic deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};