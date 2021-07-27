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
    addExperience,
} from "../redux/actions/profileActions";

class AddExperienceScreen extends Form {
    state = {
        data: {
            title: "",
            organization: "",
            location: "",
            from: "",
            to: "",
            current: "",
            description: "",
        },
        errors: {},
        responseError: "",
    };

    schema = {
        title: Joi.string().min(2).trim().required().label("Title"),
        organization: Joi.string().min(2).trim().required().label("Company"),
        location: Joi.string().min(2).trim().required().label("Location"),
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
        this.props.addExperience(payload);
    };

    componentDidUpdate(prevProps) {
        const { success, error } = this.props.updateProfile;
        const prevSuccess = prevProps.updateProfile.success;
        if (success && !prevSuccess) this.props.history.push("/dashboard");

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

        const title = {
            name: "title",
            label: "Title",
            placeholder: "Enter title here",
            required: true,
        };
        const company = {
            name: "organization",
            label: "Company",
            placeholder: "Name of company or organization",
            required: true,
        };
        const location = {
            name: "location",
            label: "Location",
            placeholder: "Place of work. e.g: New York",
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
            hint: "Is this your current work?.",
        };
        const description = {
            name: "description",
            label: "Description",
            as: "textarea",
            placeholder: "Description about work...",
        };

        const addExperience = {
            text: "Add Experience to Profile",
            variant: "warning",
            block: true,
            disabled: this.props.updateProfile.loading ? true : false,
        };

        return (
            <Container>
                <h1 className="text-center my-2 mb-4 py-2">Add Experience</h1>
                <BootstrapForm>
                    <Row className="justify-content-center align-items-center flex-column">
                        {responseError && (
                            <Col md={6} className="mb-0">
                                <p className="text-danger text-center font-weight-bold my-2">
                                    {responseError}
                                </p>
                            </Col>
                        )}
                        {this.renderInput(title)}
                        {this.renderInput(company)}
                        {this.renderInput(location)}
                        {this.renderInput(from)}
                        {this.renderInput(to)}
                        {this.renderSelect(current)}
                        {this.renderInput(description)}
                        {this.renderButton(addExperience)}
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
        addExperience: (payload) => dispatch(addExperience(payload)),
        resetProfileUpdate: () => dispatch(resetUpdateProfile()),
        resetProfile: () => dispatch(resetProfile()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddExperienceScreen);
