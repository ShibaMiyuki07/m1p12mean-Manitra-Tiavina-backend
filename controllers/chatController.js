const chatService = require("../services/chatService");

const addMessage = async (req, res) => {
    try {
        const message = await chatService.addMessage(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMessageBySender = async (req, res) => {
    try {
        const messages = await chatService.getMessageBySender(req.params.id);
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getMessageByReceiver = async (req, res) => {
    try {
        const messages = await chatService.getMessageByReceiver(req.params.idy);
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllMessage = async (req, res) => {
    try {
        const messages = await chatService.getAllMessage(req.params.receiver,req.params.sender);
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    addMessage,
    getMessageByReceiver,
    getMessageBySender,
    getAllMessage,
};