const Post = require("../models/post");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const {
    validatePostData,
    validateCommentData,
} = require("../utils/validateData");

// @route    GET /api/post/:post_id
// @desc     Get post by specifying id.
// @access   Protected
const getPostById = asyncHandler(async (req, res, next) => {
    postId = req.params.post_id;
    const post = await Post.findById(postId)
        .populate("user", ["name"])
        .populate({
            path: "comments.user",
            model: "User",
            select: "_id name",
        });

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

// @route    PUT /api/post/upvote/:post_id
// @desc     UpVote a post by specifying id.
// @access   Protected
const upVotePost = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const postId = req.params.post_id;

    const post = await Post.findById(postId);

    if (!post) return next(new ErrorResponse("Post not found!", 404));

    let upVoteIndex = post.votes.upVotes.indexOf(userId);
    let downVoteIndex = post.votes.downVotes.indexOf(userId);

    // Remove user from downVotes array if user downvoted the post and add user to upVotes array.
    if (downVoteIndex !== -1) {
        post.votes.downVotes.splice(downVoteIndex, 1); // Remove user from downVotes
        post.votes.upVotes.push(userId); // Add user to upVotes
    } else {
        // Remove user form upVotes array if user already upvoted the post else add user to upVotes array.
        if (upVoteIndex !== -1) post.votes.upVotes.splice(upVoteIndex, 1);
        else post.votes.upVotes.push(userId);
    }

    await post.save();

    return res.status(200).json({
        success: true,
        status: 200,
        votes: post.votes,
        upVotesCount: post.votes.upVotes.length,
        downVotesCount: post.votes.downVotes.length,
    });
});

// @route    PUT /api/post/downvote/:post_id
// @desc     DownVote a post by specifying id.
// @access   Protected
const downVotePost = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const postId = req.params.post_id;

    const post = await Post.findById(postId);

    if (!post) return next(new ErrorResponse("Post not found!", 404));

    let upVoteIndex = post.votes.upVotes.indexOf(userId);
    let downVoteIndex = post.votes.downVotes.indexOf(userId);

    // Remove user from upVotes array if user upvoted the post and add user to downVotes array.
    if (upVoteIndex !== -1) {
        post.votes.upVotes.splice(upVoteIndex, 1); // Remove user from upVotes
        post.votes.downVotes.push(userId); // Add user to downVotes
    } else {
        // Remove user form downVotes array if user already downvoted the post else add user to downVotes array.
        if (downVoteIndex !== -1) post.votes.downVotes.splice(downVoteIndex, 1);
        else post.votes.downVotes.push(userId);
    }

    await post.save();

    return res.status(200).json({
        success: true,
        status: 200,
        votes: post.votes,
        upVotesCount: post.votes.upVotes.length,
        downVotesCount: post.votes.downVotes.length,
    });
});

// @route    POST /api/post/comment/:post_id
// @desc     Comment on a post by specifying id.
// @access   Protected
const createComment = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const postId = req.params.post_id;

    const comment = { ...req.body };
    comment.user = userId.toString();

    // Validate data
    const { error } = validateCommentData(comment);
    if (error) return next(new ErrorResponse(error.details[0].message, 406));

    const post = await Post.findById(postId).populate({
        path: "comments.user",
        model: "User",
        select: "_id name",
    });
    if (!post) return next(new ErrorResponse("Post not found!", 404));

    comment.user = { _id: req.user._id, name: req.user.name };
    post.comments.push(comment);
    post.save();

    return res.status(201).json({
        success: true,
        status: 201,
        data: post.comments,
    });
});

// @route    DELETE /api/post/comment/:post_id/:com_id
// @desc     Delete a comment from a post by specifying post and comment id.
// @access   Protected
const deleteComment = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const postId = req.params.post_id;
    const commentId = req.params.com_id;

    const post = await Post.findById(postId);
    if (!post) return next(new ErrorResponse("Post not found!", 404));

    let commentIndex = null;
    const comment = post.comments.find((comment, index) => {
        if (comment._id.equals(commentId)) {
            commentIndex = index;
            return comment;
        }
    });

    if (!comment) return next(new ErrorResponse("Comment not found!", 404));

    if (!comment.user.equals(userId))
        return next(
            new ErrorResponse(
                "You have no authority to delete this comment!",
                403
            )
        );

    post.comments.splice(commentIndex, 1);
    post.save();

    return res.status(200).json({
        success: true,
        status: 200,
        message: "Your comment has been deleted!",
    });
});

module.exports = {
    getPostById,
    getPosts,
    createPost,
    deletePost,
    upVotePost,
    downVotePost,
    createComment,
    deleteComment,
};
