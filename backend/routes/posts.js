const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const checkObjectId = require("../middleware/checkObjectId");
const {
    getPostById,
    getPosts,
    createPost,
    deletePost,
} = require("../controllers/posts");

router
    .route("/post/:post_id")
    .get(checkObjectId("post_id"), protect, getPostById)
    .delete(checkObjectId("post_id"), protect, deletePost);
router.route("/posts").get(protect, getPosts).post(protect, createPost);

module.exports = router;
