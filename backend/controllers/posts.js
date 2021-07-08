const Post = require("../models/post");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const { validatePostData } = require("../utils/validateData");

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

// @route    POST /api/posts
// @desc     Create a post.
// @access   Protected
const createPost = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const postData = { ...req.body };

    const { error } = validatePostData(req.body);
    if (error) return next(new ErrorResponse(error.details[0].message, 406));

    postData.user = userId;
    const newPost = new Post(postData);
    await newPost.save();

    return res.status(200).json({
        success: true,
        status: 200,
        data: newPost,
    });
});

// @route    DELETE /api/post/:post_id
// @desc     Delete a post by specifying id.
// @access   Protected
const deletePost = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const postId = req.params.post_id;

    const post = await Post.findById(postId);

    // Check if the post belongs to the current user or not.
    if (!post.user.equals(userId))
        return next(
            new ErrorResponse("You have no authority to delete this post!", 403)
        );

    await post.remove();

    return res.status(200).json({
        success: true,
        status: 200,
        message: "Post has been removed successfully",
    });
});

module.exports = {
    getPostById,
    getPosts,
    createPost,
    deletePost,
};
