const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/mechanicController');
const { check } = require('express-validator');

// Validation rules
const mechanicValidation = [
    check('userId').isMongoId(),
    check('cv').notEmpty(),
    check('schedule.*.day').isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    check('schedule.*.startTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
    check('schedule.*.endTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
];

// Routes
router.post('/', mechanicValidation, mechanicController.createMechanic);
router.get('/:id', mechanicController.getMechanic);
router.put('/:id', mechanicValidation, mechanicController.updateMechanic);
router.delete('/:id', mechanicController.deleteMechanic);

// Fonctions spécifiques
router.get('/:mechanicId/check-availability/:date', mechanicController.checkMechanicAvailability);
router.get('/available/:date', mechanicController.findAvailableMechanics);

module.exports = router;