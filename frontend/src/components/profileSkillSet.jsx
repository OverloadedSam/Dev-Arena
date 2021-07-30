import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

class ProfileSkillSet extends Component {
    render() {
        const { skills } = this.props;
        return (
            <Row className="rounded bg-light text-primary mt-3 py-3">
                <Col md={12}>
                    <Accordion>
                        <Accordion.Toggle as={"div"} eventKey="0">
                            <h4 className="text-center text-success clickable">
                                <i className="fa fa-star"></i> Skills &
                                Technologies
                            </h4>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <div>
                                {skills.map((skill) => (
                                    <a
                                        href={`https://google.com/search?q=${skill}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        key={skill}
                                        className="text-decoration-none text-primary"
                                    >
                                        <p className="lead text-center mb-2 text-capitalize">
                                            <i className="fa fa-check-circle text-success"></i>{" "}
                                            {skill}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </Accordion.Collapse>
                    </Accordion>
                </Col>
            </Row>
        );
    }
}

export default ProfileSkillSet;
