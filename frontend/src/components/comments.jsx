import React, { Component } from "react";
import Comment from "./comment";

class PostComments extends Component {
    countComments = (comments) => comments.length;
    render() {
        const { comments } = this.props;
        return (
            <div>
                <h3 className="my-3 mb-5">
                    <i className="fa fa-comments text-warning"></i>{" "}
                    {this.countComments(comments)} Comment(s){" "}
                </h3>

                {comments.map((comment) => (
                    <Comment key={comment._id} {...comment} />
                ))}
            </div>
        );
    }
}

export default PostComments;
