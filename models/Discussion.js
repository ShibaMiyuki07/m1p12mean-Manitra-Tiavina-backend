const mongoose = require('mongoose');
const { Schema } = mongoose;

const discussionSchema = new Schema({
        senderId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },

    {timestamps: true}
);


const discussion = mongoose.model('Discussion', discussionSchema);

module.exports = discussion;