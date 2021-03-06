import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Loader from "../common/loader";
import ExperienceTable from "../components/experienceTable";
import EducationTable from "../components/educationTable";
import auth from "../services/authService";
import {
    deleteEducation,
    deleteExperience,
    getCurrentUserProfile,
} from "../redux/actions/profileActions";

class DashboardScreen extends Component {
    handleDeleteExperience = (id) => {
        this.props.deleteExperience(id);
    };

    handleDeleteEducation = (id) => {
        this.props.deleteEducation(id);
    };

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
        const updateProfile = this.props.updateProfile;

        const experienceDeleteColumn = {
            key: "deleteBtnKey",
            content: (item) => (
                <Button
                    variant="danger"
                    size="sm"
                    disabled={updateProfile.loading ? true : false}
                    onClick={() => this.handleDeleteExperience(item._id)}
                >
                    <i className="fa fa-trash"></i>
                </Button>
            ),
        };
        const educationDeleteColumn = {
            key: "deleteBtnKey",
            content: (item) => (
                <Button
                    variant="danger"
                    size="sm"
                    disabled={updateProfile.loading ? true : false}
                    onClick={() => this.handleDeleteEducation(item._id)}
                >
                    <i className="fa fa-trash"></i>
                </Button>
            ),
        };

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
                        <div className="overflow-auto disable-scrollbars">
                            <ExperienceTable
                                data={profileData.experiences || []}
                                column={experienceDeleteColumn}
                            />
                        </div>

                        <h3 className="my-4">Educational Qualifications</h3>
                        <div className="overflow-auto disable-scrollbars">
                            <EducationTable
                                data={profileData.education || []}
                                column={educationDeleteColumn}
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
    return {
        profile: state.profile,
        updateProfile: state.updateProfile,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentUserProfile: () => dispatch(getCurrentUserProfile()),
        deleteExperience: (id) => dispatch(deleteExperience(id)),
        deleteEducation: (id) => dispatch(deleteEducation(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
