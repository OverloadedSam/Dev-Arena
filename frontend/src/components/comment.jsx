import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostCreationDetails from "./postCreationDetails";

export class Comment extends Component {
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

export default Comment;
