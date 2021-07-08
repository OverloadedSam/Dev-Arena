const Post = require("../models/post");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @route    GET /api/post/:post_id
// @desc     Get post by specifying id.
// @access   Protected
const getPostById = asyncHandler(async (req, res, next) => {
    postId = req.params.post_id;
    const post = await Post.findById(postId).populate("user", ["name"]);

    if (!post) return next(new ErrorResponse("Post not found!", 404));

    return res.status(200).json({
        success: true,
        status: 200,
        data: post,
    });
});

// @route    GET /api/posts
// @desc     Get all posts (latest first).
// @access   Protected
const getPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find()
        .populate("user", ["name"])
        .sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        status: 200,
        data: posts,
    });
});

module.exports = {
    getPostById,
    getPosts,
};
