const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    startTime: {
        type: String,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        required: true
    },
    endTime: {
        type: String,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        validate: {
            validator: function(endTime) {
                return endTime > this.startTime;
            },
            message: 'End time must be after start time'
        },
        required: true
    }
}, { _id: false });

const mechanicSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    cv: {
        type: String,
        required: true
    },
    schedule: [scheduleSchema]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

// Index pour les recherches fréquentes
mechanicSchema.index({ userId: 1 });

const Mechanic = mongoose.model('Mechanic', mechanicSchema);

module.exports = Mechanic;