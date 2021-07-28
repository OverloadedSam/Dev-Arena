import React from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import BootstrapForm from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from "../common/loader";
import Form from "../common/form";
import {
    getCurrentUserProfile,
    resetProfile,
    updateUserProfile,
    resetUpdateProfile,
} from "../redux/actions/profileActions";

class EditProfileScreen extends Form {
    state = {
        data: {
            status: "",
            company: "",
            website: "",
            location: "",
            skills: [],
            githubUsername: "",
            bio: "",
            linkedin: "",
            facebook: "",
            instagram: "",
            twitter: "",
            youtube: "",
        },
        errors: {},
        showSocialInputs: "d-none",
        responseError: "",
    };

    schema = {
        company: Joi.string().label("Company").allow(""),
        website: Joi.string().min(4).label("Website").allow(""),
        location: Joi.string().label("Location").allow(""),
        skills: Joi.array()
            .items(Joi.string().required())
            .required()
            .label("Skills"),
        githubUsername: Joi.string().label("Github Username").allow(""),
        bio: Joi.string().max(256).label("Bio").allow(""),
        status: Joi.string().required().label("Status"),
        linkedin: Joi.string().label("Github Username").allow(""),
        facebook: Joi.string().label("Facebook").allow(""),
        instagram: Joi.string().label("Instagram").allow(""),
        twitter: Joi.string().label("Twitter").allow(""),
        youtube: Joi.string().label("Youtube").allow(""),
    };

    onChangeHandler = (e) => {
        const data = this.state.data;
        const errors = this.state.errors;

        let { name: field, value } = e.currentTarget;
        value = value.split(",");

        // Validation for skills field.
        const dataObj = { [field]: value };
        const schemaObj = { [field]: this.schema[field] };
        let { error } = Joi.validate(dataObj, schemaObj);

        error = error ? error.details[0].message : null;

        if (!error) delete errors[field];
        else errors[field] = error;
        data[field] = value;

        this.setState({ errors });
        this.setState({ data });
    };

    toggleSocialInputs = () => {
        const showSocialInputs = this.state.showSocialInputs ? "" : "d-none";
        this.setState({ showSocialInputs });
    };

    performSubmit = (e) => {
        const payload = { ...this.state.data, socialHandles: {} };
        const socialsFields = [
            "linkedin",
            "facebook",
            "instagram",
            "twitter",
            "youtube",
        ];

        for (const item of socialsFields) {
            payload.socialHandles[item] = payload[item];
            delete payload[item];
        }
        this.props.updateUserProfile(payload);
    };

    componentDidMount() {
        this.props.getCurrentUserProfile();
    }

    componentDidUpdate(prevProps) {
        const { success, profileData } = this.props.profile;
        const prevSuccess = prevProps.profile.success;
        const { success: profileUpdated, error: updateProfileError } =
            this.props.updateProfile;
        const prevUpdateSuccess = prevProps.updateProfile.success;

        if (success && profileData && prevSuccess === false) {
            let data = { ...this.state.data };
            delete profileData.createdAt;
            delete profileData.updatedAt;
            delete profileData.__v;
            delete profileData._id;
            delete profileData.education;
            delete profileData.experiences;
            delete profileData.user;
            data = { ...data, ...profileData, ...profileData.socialHandles };
            delete data.socialHandles;

            this.setState({ data });
        }

        if (profileUpdated && prevUpdateSuccess === false) {
            this.props.history.push("/dashboard");
        }
        if (updateProfileError) {
            this.props.resetProfileUpdate();
            this.setState({ responseError: updateProfileError });
        }
    }

    componentWillUnmount() {
        this.props.resetProfile();
        this.props.resetProfileUpdate();
    }

    render() {
        const { showSocialInputs, responseError } = this.state;
        const { loading, error, success, profileNotSet } = this.props.profile;

        const status = {
            name: "status",
            label: "Status",
            data: {
                firstOption: "What is your current status?",
                options: [
                    "Developer",
                    "Junior Developer",
                    "Senior Developer",
                    "Manager",
                    "Student",
                    "Instructor",
                    "Intern",
                    "Other",
                ],
            },
            hint: "Showcase where are you currently in your career.",
        };
        const company = {
            name: "company",
            label: "Company",
            placeholder: "Enter company or organization name",
            required: true,
        };
        const website = {
            name: "website",
            label: "Website",
            placeholder: "Enter your website url",
        };
        const city = {
            name: "location",
            label: "Location",
            placeholder: "e.g: New Delhi or Silicon Valley",
            hint: "City or place where you work.",
        };
        const skills = {
            name: "skills",
            label: "Skills",
            required: true,
            placeholder: "Tell us about your strengths and skills",
            hint: "Please use comma, separated values (eg. HTML, CSS, Marketing).",
            onChangeHandler: this.onChangeHandler,
        };
        const githubUsername = {
            name: "githubUsername",
            label: "Github username",
            placeholder: "Enter your github username",
        };
        const bio = {
            name: "bio",
            label: "Bio",
            as: "textarea",
            placeholder: "Your bio goes here...",
        };
        const linkedin = {
            name: "linkedin",
            label: (
                <span>
                    <i className="fa fa-linkedin-square text-info"></i> Linkedin
                </span>
            ),
            placeholder: "Linkedin profile URL",
            wrapperElementClassName: showSocialInputs,
        };
        const facebook = {
            name: "facebook",
            label: (
                <span>
                    <i className="fa fa-facebook text-info"></i> Facebook
                </span>
            ),
            placeholder: "Facebook profile/page URL",
            wrapperElementClassName: showSocialInputs,
        };
        const instagram = {
            name: "instagram",
            label: (
                <span>
                    <i className="fa fa-instagram text-danger"></i> Instagram
                </span>
            ),
            placeholder: "Instagram profile URL",
            wrapperElementClassName: showSocialInputs,
        };
        const twitter = {
            name: "twitter",
            label: (
                <span>
                    <i className="fa fa-twitter text-info"></i> Twitter
                </span>
            ),
            placeholder: "Twitter profile URL",
            wrapperElementClassName: showSocialInputs,
        };
        const youtube = {
            name: "youtube",
            label: (
                <span>
                    <i className="fa fa-youtube-play text-danger"></i> YouTube
                </span>
            ),
            placeholder: "Youtube channel URL",
            wrapperElementClassName: showSocialInputs,
        };

        const socialInputsTogglerBtn = {
            type: "button",
            text: "Add socials (Optional)",
            onClick: this.toggleSocialInputs,
        };
        const createButton = {
            text: "Save Profile",
            variant: "success",
            block: true,
            disabled: this.props.updateProfile.loading ? true : false,
        };

        return (
            <Container>
                {loading ? (
                    <Loader />
                ) : error && !profileNotSet ? (
                    <h3 className="text-center text-danger">{error}</h3>
                ) : success || profileNotSet ? (
                    <>
                        <h1 className="text-center my-2 mb-4 py-2">
                            {profileNotSet ? "Profile Setup" : "Edit profile "}
                        </h1>
                        <BootstrapForm>
                            <Row className="justify-content-center align-items-center flex-column">
                                {responseError && (
                                    <Col md={6} className="mb-0">
                                        <p className="text-danger text-center font-weight-bold my-2">
                                            {responseError}
                                        </p>
                                    </Col>
                                )}
                                {this.renderSelect(status)}
                                {this.renderInput(website)}
                                {this.renderInput(company)}
                                {this.renderInput(city)}
                                {this.renderInput(skills)}
                                {this.renderInput(githubUsername)}
                                {this.renderInput(bio)}
                                {this.renderButton(socialInputsTogglerBtn)}
                                {this.renderInput(linkedin)}
                                {this.renderInput(facebook)}
                                {this.renderInput(instagram)}
                                {this.renderInput(twitter)}
                                {this.renderInput(youtube)}
                                {this.renderButton(createButton)}
                            </Row>
                        </BootstrapForm>
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
        resetProfile: () => dispatch(resetProfile()),
        updateUserProfile: (payload) => dispatch(updateUserProfile(payload)),
        resetProfileUpdate: () => dispatch(resetUpdateProfile()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
