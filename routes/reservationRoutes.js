const express = require("express");
const reservationController = require("../controllers/reservationController");

const router = express.Router();

// Routes pour les reservations
router.post("/", reservationController.createReservation);
router.get("/:id", reservationController.getReservationById);
router.put("/:id", reservationController.updateReservation);
router.delete("/:id", reservationController.deleteReservation);
router.get("/", reservationController.getAllUnassignedReservation);
router.get("/mechanics/:id", reservationController.getReservationByMechanicId);
router.get("/users/:id", reservationController.getReservationByUserId);

module.exports = router;