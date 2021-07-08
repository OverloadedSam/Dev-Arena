const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const postSchema = new Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            trim: true,
            required: [true, "Please provide the title for the post!"],
        },
        body: {
            type: String,
            trim: true,
            required: [true, "Please provide the body of the post!"],
        },
        votes: {
            upVotes: [
                {
                    type: ObjectId,
                    ref: "User",
                },
            ],
            downVotes: [
                {
                    type: ObjectId,
                    ref: "User",
                },
            ],
        },
        comments: [
            {
                user: {
                    type: ObjectId,
                },
                body: {
                    type: String,
                    trim: true,
                    required: [true, "Please give some text for comment!"],
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
