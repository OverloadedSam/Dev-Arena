const Post = require("../models/post");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @route    GET /api/post:post_id
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

module.exports = {
    getPostById,
};
