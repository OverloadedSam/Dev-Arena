import React from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "../common/form";
import { createPost } from "../redux/actions/postActions";

class CreatePost extends Form {
    state = {
        data: {
            title: "",
            body: "",
        },
        errors: {},
    };

    schema = {
        title: Joi.string().min(2).max(128).trim().required().label("Title"),
        body: Joi.string().min(2).trim().required().label("Post Body"),
    };

    performSubmit = () => {
        const payload = {
            title: this.state.data.title,
            body: this.state.data.body,
        };
        this.props.createPost(payload);
    };

    componentDidUpdate(prevProps) {
        const { success } = this.props.postCreation;
        const prevSuccess = prevProps.postCreation.success;

        if (success && !prevSuccess) {
            const resetState = {
                data: { title: "", body: "" },
                errors: {},
            };
            this.setState(resetState);
            toast("✅ Your post has been shared!");
        }
    }

    render() {
        const { loading, error } = this.props.postCreation;
        const title = {
            name: "title",
            label: "Title",
            placeholder: "Title for the post",
        };
        const body = {
            name: "body",
            label: <i className="fa fa-pencil-square-o"></i>,
            as: "textarea",
            style: { height: "8rem" },
            placeholder: "Write something about the post...",
        };
        const createPostBtn = {
            text: (
                <>
                    <i className="fa fa-bullhorn"></i> Post
                </>
            ),
            variant: "outline-danger",
            disabled: loading ? true : false,
        };

        return (
            <Container>
                <Row className="justify-content-center align-items-center flex-column">
                    {error && (
                        <Col md={6} className="mb-0">
                            <p className="text-danger text-center font-weight-bold my-2">
                                {error}
                            </p>
                        </Col>
                    )}
                    {this.renderInput(title)}
                    {this.renderInput(body)}
                    {this.renderButton(createPostBtn)}
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postCreation: state.createPost,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (payload) => dispatch(createPost(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
