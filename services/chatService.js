const Chat = require('../models/Chat');
const Discussion = require('../models/Discussion');
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
class ChatService {

    static async addMessage(data) {
        await Discussion.updateOne({_id : new ObjectId(data.discussionId)}, {updatedAt : new Date()});
        return Chat.create(data);
    }

    static async getMessageBySender(senderId) {
        return Chat.find({senderId : senderId});
    }

    static async getAllMessage(discussionId) {
        return Chat.find({discussionId:discussionId}).sort({createdAt : -1});
    }

    static async getMessageByReceiver(receiverId) {
        return Chat.find({receiverId : receiverId});
    }
}

module.exports = ChatService;