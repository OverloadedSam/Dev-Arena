import React, { Component } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import PostCreationDetails from "./postCreationDetails";

class PostCard extends Component {
    countVotes = (votes) => votes.upVotes.length - votes.downVotes.length;

    countComments = (comments) => comments.length;

    formatPostBody = (body) => {
        let formatted = body.replace(/\n/g, "");
        if (formatted.length > 256) {
            formatted = formatted.substr(0, 252);
            formatted += " ...";
        }
        return formatted;
    };

    render() {
        const { _id, title, body, votes, comments } = this.props;
        const upVotes = votes.upVotes.length;
        const downVotes = votes.downVotes.length;
        return (
            <>
                <Row className="border rounded py-3 px-3 shadow-sm mb-2">
                    <Col xs={2} className="px-2">
                        <div className="d-flex align-items-center flex-column">
                            <h5 className="font-weight-bold">
                                {this.countVotes(votes)}
                            </h5>
                            <p
                                title={`${upVotes} Upvotes and ${downVotes} Downvotes`}
                            >
                                Votes
                            </p>
                            <Badge variant="success">
                                <h5 className="font-weight-bold">
                                    {this.countComments(comments)}
                                </h5>
                                <p className="mb-1">Comments</p>
                            </Badge>
                        </div>
                    </Col>
                    <Col xs={10} className="px-4">
                        <Row className="flex-column">
                            <Col>
                                <h4 className="font-weight-bold">
                                    <Link
                                        to={`post/${_id}`}
                                        className="text-decoration-none text-info"
                                    >
                                        <span>Q:</span> {title}
                                    </Link>
                                </h4>
                            </Col>
                            <Col>
                                <p
                                    className="tmb-1"
                                    style={{ whiteSpace: "pre-line" }}
                                >
                                    <span
                                        title="Description"
                                        className="font-weight-bold"
                                    >
                                        Desc:{" "}
                                    </span>
                                    {this.formatPostBody(body)}
                                </p>
                            </Col>
                            <Col className="text-right">
                                <PostCreationDetails
                                    {...this.props}
                                    isPost={true}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }
}

export default PostCard;
