const Chat = require('../models/Chat');
class ChatService {

    static async addMessage(data) {
        return Chat.create(data);
    }

    static async getMessageBySender(senderId) {
        return Chat.find({senderId : senderId});
    }

    static async getAllMessage(receiver, sender) {
        return Chat.find({senderId : receiver , receiverId :sender}).sort({createdAt : -1});
    }

    static async getMessageByReceiver(receiverId) {
        return Chat.find({receiverId : receiverId});
    }
}

module.exports = ChatService;