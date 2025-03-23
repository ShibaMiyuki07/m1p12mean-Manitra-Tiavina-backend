const Reservation = require("../models/Reservation");

// Créer une reservation
const createReservation = async (userData) => {
    try {
        const reservation = new Reservation(userData);
        await reservation.save();
        return reservation;
    } catch (error) {
        throw new Error("Erreur lors de la création de la reservation : " + error.message);
    }
};

// Trouver un utilisateur par son ID
const findReservationById = async (reservationId) => {
    try {
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            throw new Error("Reservation non trouvé");
        }
        return reservation;
    } catch (error) {
        throw new Error("Erreur lors de la recherche de la reservation : " + error.message);
    }
};

// Mettre à jour une reservation
const updateReservation = async (reservationId, updateData) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(reservationId, updateData, { new: true });
        if (!reservation) {
            throw new Error("Reservation non trouvé");
        }
        return reservation;
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour de la reservation : " + error.message);
    }
};

// Supprimer une reservation
const deleteReservation= async (reservationId) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(reservationId);
        if (!reservation) {
            throw new Error("Utilisateur non trouvé");
        }
        return reservation;
    } catch (error) {
        throw new Error("Erreur lors de la suppression de l'utilisateur : " + error.message);
    }
};

// Lister tous les reservations
const findAllReservations= async () => {
    try {
        const reservations = await Reservation.find();
        return reservations;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des reservations : " + error.message);
    }
};

const findAllUnassignedReservations= async () => {
    try {
        const reservations = await Reservation.aggregate([
            { $match: { mechanicId: null } },
            {
                $lookup: {
                    from: 'services',
                    localField: 'serviceId',
                    foreignField: '_id',
                    as: 'result'
                }
            },
            {
                $unwind: {
                    path: '$result',
                    includeArrayIndex: 'string',
                    preserveNullAndEmptyArrays: false
                }
            }
        ]);
        return reservations;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des reservations : " + error.message);
    }
};

const findReservationByMechanic= async (mechanicId) => {
    try {
        const reservations = await Reservation.find({mechanicId: mechanicId});
        return reservations;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des reservations : " + error.message);
    }
};

module.exports = {
    createReservation,
    findReservationById,
    updateReservation,
    deleteReservation,
    findAllReservations,
    findAllUnassignedReservations,
    findReservationByMechanic,
};