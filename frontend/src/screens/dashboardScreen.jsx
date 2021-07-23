import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Loader from "../common/loader";
import MyTable from "../common/table";
import auth from "../services/authService";
import { getCurrentUserProfile } from "../redux/actions/profileActions";

class DashboardScreen extends Component {
    handleDeleteExperience = (id) => {};

    handleDeleteEducation = (id) => {};

    renderBtn = (text, link, iconClass) => {
        return (
            <Link to={link} className="text-decoration-none">
                <Button variant="outline-primary" className="mr-3 mt-2">
                    {" "}
                    <i className={iconClass}></i> {text}
                </Button>
            </Link>
        );
    };

    componentDidMount() {
        this.props.getCurrentUserProfile();
    }

    render() {
        const { id: userId, name: userName } = auth.getCurrentUser();
        const { loading, error, success, profileData, profileNotSet } =
            this.props.profile;

        const ExperienceColumns = [
            {
                path: "organization",
                label: "Company",
            },
            {
                path: "title",
                label: "Title",
            },
            {
                path: "from",
                label: "Year",
                content: (item) => {
                    let date = item.from.slice(0, 4);
                    date += item.to ? " - " + item.to.slice(0, 4) : "";
                    return date;
                },
            },
            {
                key: "deleteBtnKey",
                content: (item) => (
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => this.handleDeleteExperience(item._id)}
                    >
                        <i className="fa fa-trash"></i>
                    </Button>
                ),
            },
        ];
        const EducationColumns = [
            {
                path: "school",
                label: "School/College",
            },
            {
                path: "degree",
                label: "Degree",
            },
            {
                path: "from",
                label: "Year",
                content: (item) => {
                    let date = item.from.slice(0, 4);
                    date += item.to ? " - " + item.to.slice(0, 4) : "";
                    return date;
                },
            },
            {
                key: "deleteBtnKey",
                content: (item) => (
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => this.handleDeleteEducation(item._id)}
                    >
                        <i className="fa fa-trash"></i>
                    </Button>
                ),
            },
        ];

        return (
            <Container>
                <h1 className="text-center my-2 mb-4 py-2">Dashboard</h1>
                {loading ? (
                    <Loader />
                ) : profileNotSet && error ? (
                    <>
                        <h5>
                            Hello and welcome <strong>{userName}</strong>!
                        </h5>
                        <h5 className="my-3">
                            You have not setup your profile yet! Add some
                            information to get started.
                        </h5>{" "}
                        <div className="mb-4">
                            {this.renderBtn(
                                "Create Profile",
                                "/edit-profile",
                                "fa fa-user-circle"
                            )}
                        </div>
                    </>
                ) : error ? (
                    <h3 className="text-center text-danger">{error}</h3>
                ) : success && profileData ? (
                    <>
                        <h5 className="mb-3">
                            Hey{" "}
                            <strong className="text-capitalize">
                                {userName}
                            </strong>
                            ! We're glad you're part of this community!
                        </h5>

                        <div className="my-2 mb-3">
                            {this.renderBtn(
                                "Edit Profile",
                                "/edit-profile",
                                "fa fa-user-circle"
                            )}
                            {this.renderBtn(
                                "Add Experience",
                                "/add-experience",
                                "fa fa-briefcase"
                            )}
                            {this.renderBtn(
                                "Add Education",
                                "/add-education",
                                "fa fa-graduation-cap"
                            )}
                            {this.renderBtn(
                                "View Profile",
                                `/profile/${userId}`,
                                "fa fa-id-card"
                            )}
                        </div>

                        <h3 className="my-4">Experience Credentials</h3>
                        <div className="overflow-auto">
                            <MyTable
                                data={profileData.experiences || []}
                                columns={ExperienceColumns}
                            />
                        </div>

                        <h3 className="my-4">Educational Qualifications</h3>
                        <div className="overflow-auto">
                            <MyTable
                                data={profileData.education || []}
                                columns={EducationColumns}
                            />
                        </div>
                    </>
                ) : (
                    ""
                )}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { profile: state.profile };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentUserProfile: () => dispatch(getCurrentUserProfile()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
