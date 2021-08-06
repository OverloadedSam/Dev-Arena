import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PostCreationDetails from "./postCreationDetails";
import { getCurrentUser } from "../services/authService";
import { deleteComment } from "../redux/actions/postActions";

export class Comment extends Component {
    handleDelete = (commentId) => {
        const currentUserId = getCurrentUser().id;
        const commentUserId = this.props.user._id;
        const { postId, deleteComment } = this.props;

        if (currentUserId === commentUserId) deleteComment(postId, commentId);
    };

    renderDeleteButton() {
        const currentUserId = getCurrentUser().id;
        const commentUserId = this.props.user._id;

        return currentUserId === commentUserId ? (
            <Button
                variant="outline-danger"
                size="sm"
                className="my-3"
                title="Delete Comment"
                onClick={() => this.handleDelete(this.props._id)}
            >
                <i className="fa fa-trash"></i>
            </Button>
        ) : (
            ""
        );
    }

    render() {
        const { user, avatar, body, date } = this.props;
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <h5 className="pb-1 font-weight-bold text-capitalize">
                            <i className="fa fa-comment text-danger"></i>{" "}
                            {user.name}
                        </h5>
                        <p className="lead" style={{ whiteSpace: "pre-line" }}>
                            {body}
                        </p>
                    </Col>
                </Row>
                {this.renderDeleteButton()}
                <div className="text-right">
                    <PostCreationDetails
                        {...this.props}
                        avatar={avatar}
                        createdAt={date}
                    />
                </div>
                <hr />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (postId, commentId) =>
            dispatch(deleteComment(postId, commentId)),
    };
};

export default connect(null, mapDispatchToProps)(Comment);
