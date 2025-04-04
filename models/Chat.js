const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
        discussionId: {
            type: Schema.Types.ObjectId,
            ref : "Discussion",
            required: true
        },
        senderId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },

    {timestamps: true}
);


const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;