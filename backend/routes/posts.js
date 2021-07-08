const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const checkObjectId = require("../middleware/checkObjectId");
const { getPostById, getPosts, createPost } = require("../controllers/posts");

router.get("/post/:post_id", checkObjectId("post_id"), protect, getPostById);
router.route("/posts").get(protect, getPosts).post(protect, createPost);

module.exports = router;
