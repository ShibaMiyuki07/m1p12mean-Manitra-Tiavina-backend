const mongoose = require('mongoose');
const { Schema } = mongoose;

const discussionSchema = new Schema({
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },

    {timestamps: true}
);


const discussion = mongoose.model('Discussion', discussionSchema);

module.exports = discussion;