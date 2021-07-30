import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EducationTable from "./educationTable";

export class ProfileEducations extends Component {
    render() {
        const { education, user } = this.props;
        return (
            <Row className="rounded bg-light text-primary mt-3 py-3">
                <Col
                    md={12}
                    className="d-flex justify-content-center align-items-center flex-column"
                >
                    <h4 className="text-success">
                        <i className="fa fa-graduation-cap"></i> Educations
                    </h4>
                    {education.length === 0 ? (
                        <p className="text-center mb-0">
                            <span className="text-capitalize">
                                {user.name} has not listed any education
                                qualification!
                            </span>
                        </p>
                    ) : (
                        <div
                            className="overflow-auto disable-scrollbars"
                            style={{ width: "100%" }}
                        >
                            <EducationTable data={education} />
                        </div>
                    )}
                </Col>
            </Row>
        );
    }
}

export default ProfileEducations;
