import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Joi from "joi-browser";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapForm from "react-bootstrap/Form";
import Form from "../common/form";
import { registerUser, resetRegisterUser } from "../redux/actions/userActions";

class RegisterScreen extends Form {
    state = {
        data: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        errors: {},
        responseError: null,
    };

    schema = {
        name: Joi.string().required().min(2).max(128).required().label("Name"),
        email: Joi.string().email().required().label("Email address"),
        password: Joi.string().required().label("Password"),
        confirmPassword: Joi.string().required().label("Confirm Password"),
    };

    performSubmit = (e) => {
        e.preventDefault();
        const errors = { ...this.state.errors };

        const payload = { ...this.state.data };
        if (payload.password !== payload.confirmPassword) {
            errors.confirmPassword = "Passwords are not matching!";
            return this.setState({ errors });
        }
        delete payload.confirmPassword;
        this.props.registerUser(payload);
    };

    componentDidUpdate() {
        const { success, error } = this.props.userRegister;

        if (success) return (window.location = "/dashboard");
        if (error) {
            this.setState({ responseError: error });
            this.props.resetRegisterUser();
        }
    }

    render() {
        if (this.props.isLoggedIn) return <Redirect to="/home" />;

        const { responseError } = this.state;
        const usernameInput = {
            name: "name",
            label: "Name",
            placeholder: "Enter your full name",
            hint: "Please fill out your official name here. Please don't provide your Discord or social media name.",
        };
        const emailInput = {
            name: "email",
            label: "E-mail Address",
            placeholder: "ex: email@domain.com",
            type: "email",
            autoComplete: "username",
        };
        const passwordInput = {
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
            type: "Password",
            required: true,
        };
        const confirmPasswordInput = {
            name: "confirmPassword",
            label: "Confirm Password",
            placeholder: "Re-enter your password",
            type: "Password",
            required: true,
        };
        const buttonAttributes = {
            variant: "success",
            text: "Create Account",
            block: true,
            disabled: this.props.userRegister.loading ? true : false,
        };

        return (
            <Container>
                <h1 className="text-center my-2 mb-4 py-2">Create Account</h1>
                <h1 className="text-center text-success my-0">
                    <i className="fa fa-user-plus"></i>
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
                        {this.renderInput(usernameInput)}
                        {this.renderInput(emailInput)}
                        {this.renderInput(passwordInput)}
                        {this.renderInput(confirmPasswordInput)}
                        {this.renderButton(buttonAttributes)}
                        <Col md={6} className="mb-4 mt-2">
                            <p>
                                Already have an account?{" "}
                                <Link to="/login">Log in here</Link>{" "}
                            </p>
                        </Col>
                    </Row>
                </BootstrapForm>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userRegister: state.userRegister,
        isLoggedIn: state.userLogin.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (payload) => dispatch(registerUser(payload)),
        resetRegisterUser: () => dispatch(resetRegisterUser()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
