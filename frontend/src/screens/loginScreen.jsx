import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Joi from "joi-browser";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapForm from "react-bootstrap/Form";
import Form from "../common/form";
import { loginUser, resetLoginUser } from "../redux/actions/userActions";

class LoginScreen extends Form {
    state = {
        data: {
            email: "",
            password: "",
        },
        errors: {},
        responseError: null,
    };

    schema = {
        email: Joi.string().email().label("E-mail"),
        password: Joi.string().label("Password"),
    };

    performSubmit = (e) => {
        e.preventDefault();
        const payload = { ...this.state.data };
        this.props.loginUser(payload);
    };

    componentDidUpdate() {
        const { success, error } = this.props.userLogin;

        const { state } = this.props.location;
        if (success) {
            if (state && state.from.pathname) {
                window.location = state.from.pathname;
            } else {
                window.location = "/dashboard";
            }
        }
        if (error) {
            this.setState({ responseError: error });
            this.props.resetLoginUser();
        }
    }

    render() {
        const { loading, isLoggedIn } = this.props.userLogin;
        if (isLoggedIn) return <Redirect to="/home" />;

        const { responseError } = this.state;
        const emailInput = {
            name: "email",
            label: "E-mail",
            placeholder: "Your e-mail goes here",
            type: "email",
            autoComplete: "username",
            required: true,
        };
        const passwordInput = {
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
            type: "password",
            autoComplete: "current-password",
            required: true,
        };
        const loginButton = {
            text: "Log in",
            variant: "outline-danger",
            block: true,
            disabled: loading ? true : false,
        };

        return (
            <Container>
                <h1 className="text-center my-2 mb-4 py-2">Login</h1>
                <h1 className="text-center text-danger my-0">
                    <i className="fa fa-user-circle"></i>
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
                        {this.renderInput(emailInput)}
                        {this.renderInput(passwordInput)}
                        {this.renderButton(loginButton)}
                        <Col md={6} className="mb-4 mt-2">
                            <p>
                                Don't have an account?{" "}
                                <Link to="/register">
                                    Create an account here
                                </Link>{" "}
                            </p>
                        </Col>
                    </Row>
                </BootstrapForm>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { userLogin: state.userLogin };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (payload) => dispatch(loginUser(payload)),
        resetLoginUser: () => dispatch(resetLoginUser()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
