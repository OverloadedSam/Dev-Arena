const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const checkObjectId = require("../middleware/checkObjectId");
const {
    getPostById,
    getPosts,
    createPost,
    deletePost,
    upVotePost,
    downVotePost,
} = require("../controllers/posts");

router
    .route("/post/:post_id")
    .get(checkObjectId("post_id"), protect, getPostById)
    .delete(checkObjectId("post_id"), protect, deletePost);
router.put(
    "/post/upvote/:post_id",
    checkObjectId("post_id"),
    protect,
    upVotePost
);
router.put(
    "/post/downvote/:post_id",
    checkObjectId("post_id"),
    protect,
    downVotePost
);
router.route("/posts").get(protect, getPosts).post(protect, createPost);

module.exports = router;
