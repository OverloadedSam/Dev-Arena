import React from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import BootstrapForm from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "../common/form";
import {
    resetProfile,
    resetUpdateProfile,
    addEducation,
} from "../redux/actions/profileActions";

class AddEducationScreen extends Form {
    state = {
        data: {
            school: "",
            degree: "",
            location: "",
            fieldOfStudy: "",
            from: "",
            to: "",
            current: "",
            description: "",
        },
        errors: {},
        responseError: "",
    };

    schema = {
        school: Joi.string().min(2).trim().required().label("School/College"),
        degree: Joi.string().min(2).trim().required().label("Degree/Diploma"),
        location: Joi.string().min(2).trim().required().label("Location"),
        fieldOfStudy: Joi.string()
            .min(2)
            .trim()
            .required()
            .label("Field of study"),
        from: Joi.string().required().label("Starting Date"),
        to: Joi.string().label("Ending date").allow(""),
        current: Joi.string().allow("").label("Current"),
        description: Joi.string()
            .trim()
            .max(256)
            .allow("")
            .label("Description"),
    };

    performSubmit = (e) => {
        const payload = { ...this.state.data };
        if (!payload.to) delete payload.to;
        payload.current = payload.current ? true : false;
        this.props.addEducation(payload);
    };

    componentDidUpdate() {
        const { success, error } = this.props.updateProfile;

        if (success) this.props.history.push("/dashboard");

        if (error) {
            this.props.resetProfileUpdate();
            this.setState({ responseError: error });
        }
    }

    componentWillUnmount() {
        this.props.resetProfileUpdate();
        this.props.resetProfile();
    }

    render() {
        const { responseError } = this.state;

        const school = {
            name: "school",
            label: "School or College",
            placeholder: "Enter name of school or college",
            required: true,
        };
        const degree = {
            name: "degree",
            label: "Degree",
            placeholder: "Name of degree, diploma etc.",
            required: true,
        };
        const fieldOfStudy = {
            name: "fieldOfStudy",
            label: "Field of study",
            placeholder: "what was the study about?",
            hint: "For example: Computer Science or Embedded System.",
            required: true,
        };
        const location = {
            name: "location",
            label: "Location",
            placeholder: "Place of the school or college",
            required: true,
        };
        const from = {
            name: "from",
            label: "From",
            type: "date",
            required: true,
        };
        const to = {
            name: "to",
            label: "To",
            type: "date",
        };
        const current = {
            name: "current",
            label: "Current",
            data: {
                firstOption: "No",
                options: ["Yes"],
            },
            hint: "Are you currently pursuing this degree/diploma?.",
        };
        const description = {
            name: "description",
            label: "Description",
            as: "textarea",
            placeholder: "Description about the study...",
        };

        const addEducation = {
            text: "Add Education to Profile",
            variant: "danger",
            block: true,
            disabled: this.props.updateProfile.loading ? true : false,
        };

        return (
            <Container>
                <h1 className="text-center my-2 mb-4 py-2">Add Education</h1>
                <BootstrapForm>
                    <Row className="justify-content-center align-items-center flex-column">
                        {responseError && (
                            <Col md={6} className="mb-0">
                                <p className="text-danger text-center font-weight-bold my-2">
                                    {responseError}
                                </p>
                            </Col>
                        )}
                        {this.renderInput(school)}
                        {this.renderInput(degree)}
                        {this.renderInput(location)}
                        {this.renderInput(fieldOfStudy)}
                        {this.renderInput(from)}
                        {this.renderInput(to)}
                        {this.renderSelect(current)}
                        {this.renderInput(description)}
                        {this.renderButton(addEducation)}
                    </Row>
                </BootstrapForm>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        updateProfile: state.updateProfile,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addEducation: (payload) => dispatch(addEducation(payload)),
        resetProfileUpdate: () => dispatch(resetUpdateProfile()),
        resetProfile: () => dispatch(resetProfile()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEducationScreen);
