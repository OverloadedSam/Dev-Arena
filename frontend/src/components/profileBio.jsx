import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class ProfileBio extends Component {
    render() {
        const { bio, user } = this.props;
        if (!bio) return null;
        return (
            <Row className="rounded bg-light text-primary mt-3 py-3">
                <Col className="d-flex justify-content-center align-items-center flex-column">
                    <h4 className="text-success">
                        <i className="fa fa-pencil"></i>{" "}
                        <span className="text-capitalize">{user.name}</span>'s
                        Bio
                    </h4>
                    <p className="lead text-center mb-0">{bio}</p>
                </Col>
            </Row>
        );
    }
}

export default ProfileBio;
