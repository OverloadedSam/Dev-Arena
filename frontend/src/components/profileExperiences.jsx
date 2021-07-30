import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExperienceTable from "./experienceTable";

class ProfileExperiences extends Component {
    render() {
        const { experiences, user } = this.props;
        return (
            <Row className="rounded bg-light text-primary mt-3 py-3">
                <Col className="d-flex justify-content-center align-items-center flex-column">
                    <h4 className="text-success">
                        <i className="fa fa-line-chart"></i> Experiences
                    </h4>
                    {experiences.length === 0 ? (
                        <p className="text-center mb-0">
                            <span className="text-capitalize">
                                {user.name} has not listed any experience!
                            </span>
                        </p>
                    ) : (
                        <div
                            className="overflow-auto disable-scrollbars"
                            style={{ width: "100%" }}
                        >
                            <ExperienceTable data={experiences} />
                        </div>
                    )}
                </Col>
            </Row>
        );
    }
}

export default ProfileExperiences;
