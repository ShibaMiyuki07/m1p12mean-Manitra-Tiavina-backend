const Discussion = require("../models/Discussion");
const mongoose = require("mongoose");

// Créer une reservation
const createDiscussion = async (discussionData) => {
    try {
        return new Discussion(discussionData).save();
    } catch (error) {
        throw new Error("Erreur lors de la création de nouvel discussion : " + error.message);
    }
};

const getDiscussionByUser = async (senderId,receiverId) => {
    try {
        return Discussion.find({$or : [{$and : [{senderId: senderId},{receiverId: receiverId}] } , {$and : [{receiverId: senderId},{senderId: receiverId}] } ]});
    } catch (error) {
        throw new Error("Erreur lors de la création du nouveau produit : " + error.message);
    }
};

const getAllDiscussions = async (userId) => {
    try {
        return Discussion.find({$or : [{senderId: userId} ,{receiverId: userId}]}).sort({updatedAt: -1});
    } catch (error) {
        throw new Error("Erreur lors de la création du nouveau produit : " + error.message);
    }
}

module.exports = {
    createDiscussion,
    getDiscussionByUser,
    getAllDiscussions,
}