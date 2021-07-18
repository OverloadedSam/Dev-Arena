import React, { Component } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

class ProfileCard extends Component {
    render() {
        const { avatar, user, status, company, skills } = this.props;

        return (
            <Row className="border rounded mb-3 shadow-sm mx-1 py-3">
                {/* Display profile */}
                <Col
                    md={3}
                    className="d-flex justify-content-center align-items-center"
                >
                    <Image
                        src={avatar ? avatar : "/assets/images/avatar.png"}
                        roundedCircle
                        alt={`${user.name}`}
                        style={{ height: "150px", width: "150px" }}
                    />
                </Col>

                {/* Name, Post, Company(If any) and view profile */}
                <Col
                    md={5}
                    className="d-flex justify-content-center align-items-center"
                >
                    <div className="d-md-block d-flex justify-content-center align-items-center flex-column">
                        <h3 className="font-weight-bold py-2 my-2 text-capitalize">
                            {user.name}
                        </h3>
                        <p className=" mb-1">{status}</p>
                        {company && <p className="mt-1">{company}</p>}
                        <Link to={`profile/${user._id}`}>
                            <Button variant="outline-primary">
                                View Profile
                            </Button>
                        </Link>
                    </div>
                </Col>

                {/* Skill set list */}
                <Col md={4} className="d-none d-md-flex flex-column">
                    <h4 className="py-2 my-2k">Skill Set</h4>
                    <div
                        className="overflow-auto disable-scrollbars"
                        style={{ height: "150px" }}
                    >
                        <ListGroup>
                            {skills.map((skill) => (
                                <ListGroup.Item
                                    key={skill}
                                    className="text-primary text-capitalize"
                                    action
                                >
                                    <i className="fa fa-star text-danger"></i>{" "}
                                    {skill}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default ProfileCard;
