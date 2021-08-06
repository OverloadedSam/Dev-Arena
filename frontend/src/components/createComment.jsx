import React from "react";
import Joi from "joi-browser";
import Row from "react-bootstrap/row";
import Form from "../common/form";
import { connect } from "react-redux";
import { addComment } from "../redux/actions/postActions";

class CreateComment extends Form {
    state = {
        data: {
            body: "",
        },
        errors: {},
    };

    schema = {
        body: Joi.string().trim().required().label("Comment"),
    };

    performSubmit = () => {
        const resetState = { data: { body: "" }, errors: {} };
        const payload = this.state.data;
        const postId = this.props.post.postData._id;

        this.props.addComment(postId, payload);
        this.setState(resetState);
    };

    render() {
        const commentTextArea = {
            label: `Reply to ${this.props.post.postData.user.name}'s post`,
            name: "body",
            as: "textarea",
            style: { height: "8rem" },
            placeholder: "Write a comment...",
        };
        const commentButton = {
            text: (
                <>
                    <i className="fa fa-paper-plane"></i> Post Comment
                </>
            ),
            variant: "success",
        };
        return (
            <Row className="align-items-center flex-column mb-4">
                {this.renderInput(commentTextArea)}
                {this.renderButton(commentButton)}
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return { post: state.post };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (id, payload) => dispatch(addComment(id, payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
