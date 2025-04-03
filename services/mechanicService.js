const Mechanic = require('../models/Mechanic');
const moment = require('moment');

class MechanicService {
    // Vérifie si une date est dans l'emploi du temps d'un mécanicien spécifique
    static async isDateValidForMechanic(mechanicId, date) {
        const mechanic = await Mechanic.findById(mechanicId);
        if (!mechanic) throw new Error('Mechanic not found');

        const inputDate = moment(date);
        const dayOfWeek = inputDate.format('dddd'); // 'Monday', 'Tuesday', etc.
        const time = inputDate.format('HH:mm');

        const schedule = mechanic.schedule.find(s => s.day === dayOfWeek);
        if (!schedule) return false;

        return time >= schedule.startTime && time <= schedule.endTime;
    }

    // Trouve tous les mécaniciens disponibles à une date donnée
    static async findAvailableMechanics(date) {
        const inputDate = moment(date);
        const dayOfWeek = inputDate.format('dddd');
        const time = inputDate.format('HH:mm');

        return Mechanic.find({
            'schedule': {
                $elemMatch: {
                    day: dayOfWeek,
                    startTime: { $lte: time },
                    endTime: { $gte: time }
                }
            }
        });
    }

    // CRUD standard
    static async createMechanic(data) {
        return Mechanic.create(data);
    }

    static async getMechanicById(id) {
        return Mechanic.findById(id).populate('userId', 'name email');
    }

    static async updateMechanic(id, data) {
        return Mechanic.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteMechanic(id) {
        return Mechanic.findByIdAndDelete(id);
    }
}

module.exports = MechanicService;