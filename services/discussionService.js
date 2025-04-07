const Discussion = require("../models/Discussion");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

// Créer une reservation
const createDiscussion = async (discussionData) => {
    try {
        const discussion = await Discussion.find({$or : [{ $and : [{receiverId: discussionData.receiverId},{senderId: discussionData.senderId}]  } , { $and : [{receiverId: discussionData.senderId},{senderId: discussionData.receiverId}]  }] }).countDocuments();
        if(discussion === 0)       return new Discussion(discussionData).save();
        return await Discussion.find({$or : [{ $and : [{receiverId: discussionData.receiverId},{senderId: discussionData.senderId}]  } , { $and : [{receiverId: discussionData.senderId},{senderId: discussionData.receiverId}]  }] });
    } catch (error) {
        throw new Error("Erreur lors de la création de nouvel discussion : " + error.message);
    }
};

const getDiscussionByUser = async (senderId,receiverId) => {
    try {
        return Discussion.find({$or : [{$and : [{senderId: senderId},{receiverId: receiverId}] } , {$and : [{receiverId: senderId},{senderId: receiverId}] } ]});
    } catch (error) {
        throw new Error("Erreur lors de getDiscussionByUser : " + error.message);
    }
};

const getAllDiscussions = async (userId) => {
    try {
        return Discussion.aggregate([
            {
                $match: {
                    $or: [
                        {
                            senderId: new ObjectId(
                                "65f8e8b1e4b1a2b3c4d5e6f1"
                            )
                        },
                        {
                            receiverId: new ObjectId(
                                "65f8e8b1e4b1a2b3c4d5e6f1"
                            )
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "receiverId",
                    foreignField: "_id",
                    as: "receiver"
                }
            },
            {
                $unwind: {
                    path: "$receiver",
                    includeArrayIndex: "receive",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "senderId",
                    foreignField: "_id",
                    as: "sender"
                }
            },
            {
                $unwind: {
                    path: "$sender",
                    includeArrayIndex: "send",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $lookup: {
                    from: "chats",
                    let: {
                        discussionId: "$_id"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        "$discussionId",
                                        "$$discussionId"
                                    ]
                                }
                            }
                        }
                    ],
                    as: "lastMessage"
                }
            },
            {
                $unwind:
                    {
                        path: "$lastMessage",
                        includeArrayIndex: "string",
                        preserveNullAndEmptyArrays: false
                    }
            }
        ]).sort({updatedAt: 1});
    } catch (error) {
        throw new Error("Erreur lors de getAllDiscussions : " + error.message);
    }
}

module.exports = {
    createDiscussion,
    getDiscussionByUser,
    getAllDiscussions,
}