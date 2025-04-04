const discussionController = require("../services/discussionService");

const createDiscussion = async (req,res) =>
{
    try {
        const discussion = await discussionController.createDiscussion(req.body);
        res.status(201).json(discussion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getDiscussionByUser = async (req,res) =>
{
    try {
        const discussions = await discussionController.getDiscussionByUser(req.params.receiver,req.params.sender);
        res.status(201).json(discussions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllDiscussions = async (req,res) =>
{
    try {
        const discussions = await discussionController.getAllDiscussions(req.params.id);
        res.status(201).json(discussions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createDiscussion,
    getDiscussionByUser,
    getAllDiscussions,
};
