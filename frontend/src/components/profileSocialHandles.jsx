import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ProfileSocialHandles extends Component {
    render() {
        const { socialHandles, githubUsername, website } = this.props;
        const { facebook, instagram, twitter, youtube, linkedin } =
            socialHandles;
        if (
            facebook ||
            instagram ||
            twitter ||
            youtube ||
            linkedin ||
            website ||
            githubUsername
        )
            return (
                <Row className="rounded bg-light text-primary mt-3 py-3">
                    <Col
                        md={12}
                        className="d-flex justify-content-center align-items-center flex-column"
                    >
                        <h4 className="text-success text-center">
                            <i className="fa fa-link"></i> Get Connected
                        </h4>
                    </Col>
                    <Col md={12}>
                        <h3 className="text-center">
                            {facebook && (
                                <a
                                    href={facebook}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <i className="fa fa-facebook-square text-info mr-4"></i>
                                </a>
                            )}
                            {instagram && (
                                <a
                                    href={instagram}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <i className="fa fa-instagram text-danger mr-4"></i>
                                </a>
                            )}
                            {twitter && (
                                <a
                                    href={twitter}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <i className="fa fa-twitter text-info mr-4"></i>
                                </a>
                            )}
                            {youtube && (
                                <a
                                    href={youtube}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <i className="fa fa-youtube-play text-danger mr-4"></i>
                                </a>
                            )}
                            {linkedin && (
                                <a
                                    href={linkedin}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <i className="fa fa-linkedin text-info mr-4"></i>
                                </a>
                            )}

                            {githubUsername && (
                                <a
                                    href={`https://github.com/${githubUsername}`}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <i className="fa fa-github text-primary mr-4"></i>
                                </a>
                            )}

                            {website && (
                                <a
                                    href={website}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <i className="fa fa-globe text-primary mr-4"></i>
                                </a>
                            )}
                        </h3>
                    </Col>
                </Row>
            );
        else return null;
    }
}

export default ProfileSocialHandles;
