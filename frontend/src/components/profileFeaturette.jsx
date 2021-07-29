import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export class ProfileFeaturette extends Component {
    render() {
        const { avatar, user, status, company, location } = this.props;

        return (
            <Row className="rounded bg-success text-primary mt-3 py-3">
                <Col
                    md={12}
                    className="d-flex justify-content-center flex-column align-items-center "
                >
                    <Image
                        src={avatar ? avatar : "/assets/images/avatar.png"}
                        roundedCircle
                        alt={user.name}
                        className="border border-light p-2"
                        fluid
                        style={{ width: "15rem" }}
                    />
                    <h2 className="my-3 text-center text-light text-capitalize">
                        {user.name}
                    </h2>
                </Col>
                <Col
                    md={12}
                    className="d-flex justify-content-center align-items-center flex-column"
                >
                    {status && status !== "Other" && (
                        <h5 className="mb-3 text-center text-light">
                            {status}
                        </h5>
                    )}
                    {company && (
                        <h5 className="text-center text-light text-capitalize">
                            <i className="fa fa-briefcase"></i> Works at{" "}
                            <em>{company}</em>
                        </h5>
                    )}
                    {location && (
                        <h5 className="text-center text-light text-capitalize">
                            <i className="fa fa-home"></i> Lives in {location}
                        </h5>
                    )}
                </Col>
            </Row>
        );
    }
}

export default ProfileFeaturette;
