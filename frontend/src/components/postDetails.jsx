import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostCreationDetails from "../components/postCreationDetails";

export class PostDetails extends Component {
    calculateVotes = (votes) => votes.upVotes.length - votes.downVotes.length;

    countComments = (comments) => comments.length;

    render() {
        const { title, body, votes, user, avatar, createdAt } = this.props;
        return (
            <div>
                <h2 className="my-3">Q: {title}</h2>
                <hr />

                <Row>
                    <Col
                        xs={2}
                        className="d-flex flex-column align-items-center px-2"
                    >
                        <i className="fa fa-chevron-circle-up vote-icon clickable"></i>
                        <h4 className="my-3">{this.calculateVotes(votes)}</h4>
                        <i className="fa fa-chevron-circle-down vote-icon clickable"></i>
                    </Col>

                    <Col xs={10} className="p-0">
                        <p
                            className="px-3 lead"
                            style={{ whiteSpace: "pre-line" }}
                        >
                            {body}
                        </p>
                    </Col>
                </Row>

                <div className="text-right">
                    <PostCreationDetails
                        user={user}
                        avatar={avatar}
                        isPost={true}
                        createdAt={createdAt}
                    />
                </div>
                <hr />
            </div>
        );
    }
}

export default PostDetails;
