const express = require("express");
const discussionController = require("../controllers/discussionController");

const router = express.Router();

router.post("/", discussionController.createDiscussion);
router.get("/users/:receiver/:sender", discussionController.getDiscussionByUser);
router.get("/all/:id", discussionController.getAllDiscussions);



module.exports = router;