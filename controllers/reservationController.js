const reservationService = require("../services/reservationService");

// Créer un utilisateur
const createReservation = async (req, res) => {
    try {
        const reservation = await reservationService.createReservation(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Trouver un utilisateur par son ID
const getReservationById = async (req, res) => {
    try {
        const reservation = await reservationService.findReservationById(req.params.id);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Mettre à jour un utilisateur
const updateReservation = async (req, res) => {
    try {
        const reservation = await reservationService.updateReservation(req.params.id, req.body);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un utilisateur
const deleteReservation = async (req, res) => {
    try {
        const user = await reservationService.deleteReservation(req.params.id);
        res.status(200).json({ message: "Utilisateur supprimé avec succès", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lister tous les utilisateurs
const getAllReservation = async (req, res) => {
    try {
        const reservations = await reservationService.findAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllUnassignedReservation = async (req, res) => {
    try {
        const reservations = await reservationService.findAllUnassignedReservations();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getReservationByMechanicId = async (req, res) => {
    try {
        const reservation = await reservationService.findReservationByMechanic(req.params.id);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getReservationByUserId = async (req, res) => {
    try {
        const reservation = await reservationService.findReservationByUser(req.params.id);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createReservation,
    getReservationById,
    updateReservation,
    deleteReservation,
    getAllReservation,
    getAllUnassignedReservation,
    getReservationByMechanicId,
    getReservationByUserId,
};