import React from "react";
import Joi from "joi-browser";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "../common/form";

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

    performSubmit = () => {};

    render() {
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
        };

        return (
            <Container>
                <Row className="justify-content-center align-items-center flex-column">
                    {this.renderInput(title)}
                    {this.renderInput(body)}
                    {this.renderButton(createPostBtn)}
                </Row>
            </Container>
        );
    }
}

export default CreatePost;
