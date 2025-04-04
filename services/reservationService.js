const Reservation = require("../models/Reservation");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

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
        const reservation = await Reservation.aggregate([
            {
                $match: {
                    _id: new ObjectId(reservationId)
                }
            },
            {
                $lookup: {
                    from: "services",
                    localField: "serviceId",
                    foreignField: "_id",
                    as: "result"
                }
            },
            {
                $unwind: {
                    path: "$result",
                    includeArrayIndex: "string",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $lookup:
                    {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user"
                    }
            },
            {
                $unwind:
                    {
                        path: "$user",
                        includeArrayIndex: "string",
                        preserveNullAndEmptyArrays: false
                    }
            }
        ]);
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
        const reservations = await Reservation.aggregate([
            {
                $match: {
                    mechanicId: new ObjectId(mechanicId)
                }
            },
            {
                $lookup: {
                    from: "services",
                    localField: "serviceId",
                    foreignField: "_id",
                    as: "result"
                }
            },
            {
                $unwind: {
                    path: "$result",
                    includeArrayIndex: "string",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $lookup:
                    {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user"
                    }
            },
            {
                $unwind:
                    {
                        path: "$user",
                        includeArrayIndex: "string",
                        preserveNullAndEmptyArrays: false
                    }
            }
        ]);
        return reservations;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des reservations : " + error.message);
    }
};

const findReservationByUser= async (userId) => {
    try {
        const reservations = await Reservation.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "services",
                    localField: "serviceId",
                    foreignField: "_id",
                    as: "result"
                }
            },
            {
                $unwind: {
                    path: "$result",
                    includeArrayIndex: "string",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $lookup:
                    {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user"
                    }
            },
            {
                $unwind:
                    {
                        path: "$user",
                        includeArrayIndex: "string",
                        preserveNullAndEmptyArrays: false
                    }
            }
        ]);
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
    findReservationByUser
};