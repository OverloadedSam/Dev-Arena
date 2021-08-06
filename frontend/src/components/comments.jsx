import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "./comment";
import CreateComment from "./createComment";

class Comments extends Component {
    countComments = (comments) => comments.length;
    render() {
        const { comments } = this.props.post.postData;
        return (
            <div>
                <h3 className="my-3 mb-5">
                    <i className="fa fa-comments text-warning"></i>{" "}
                    {this.countComments(comments)} Comment(s){" "}
                </h3>

                {comments.map((comment) => (
                    <Comment key={comment._id} {...comment} />
                ))}

                <CreateComment />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { post: state.post };
};

export default connect(mapStateToProps)(Comments);
