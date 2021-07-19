import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class Header extends Component {
    renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Logout
        </Tooltip>
    );

    render() {
        const isLoggedIn = this.props.isLoggedIn;

        return (
            <div className="header-wrapper">
                <Navbar
                    className="py-2 header navbar-static-top"
                    bg="primary"
                    expand="lg"
                >
                    <Navbar.Brand className="text-light">
                        <h4 className="mb-0 text-warning">DEV ARENA</h4>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className="justify-content-between"
                    >
                        <Nav className="mr-auto light">
                            <NavLink
                                to="/home"
                                className="nav-link mx-auto navbar-item text-decoration-none"
                            >
                                <i className="ml-3 px-0 fa fa-home"></i> Home
                            </NavLink>
                            <NavLink
                                to="/developers"
                                className="nav-link mx-auto navbar-item text-decoration-none"
                            >
                                <i className="ml-3 px-0 fa fa-users"></i>{" "}
                                Developers
                            </NavLink>
                            {isLoggedIn && (
                                <NavLink
                                    to="/posts"
                                    className="nav-link mx-auto navbar-item text-decoration-none"
                                >
                                    <i className="ml-3 px-0 fa fa-newspaper-o"></i>{" "}
                                    Posts
                                </NavLink>
                            )}
                        </Nav>
                        <Nav className="ml-auto">
                            {!isLoggedIn && (
                                <>
                                    <NavLink
                                        to="/login"
                                        className="nav-link mx-auto navbar-item text-decoration-none"
                                    >
                                        <Button variant="danger">
                                            <i className="fa fa-sign-in"> </i>{" "}
                                            Log in
                                        </Button>
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        className="nav-link mx-auto navbar-item text-decoration-none"
                                    >
                                        <Button variant="outline-success">
                                            <i className="fa fa-user-plus"> </i>{" "}
                                            Register
                                        </Button>
                                    </NavLink>
                                </>
                            )}

                            {isLoggedIn && (
                                <>
                                    <NavLink
                                        to="/dashboard"
                                        className="nav-link mx-auto navbar-item text-decoration-none"
                                    >
                                        <Button
                                            variant="outline-info"
                                            className="text-light"
                                        >
                                            <i className="fa fa-user-circle"></i>{" "}
                                            Dashboard
                                        </Button>
                                    </NavLink>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={this.renderTooltip}
                                    >
                                        <NavLink
                                            to="/logout"
                                            className="nav-link mx-auto navbar-item text-decoration-none"
                                        >
                                            <Button variant="warning">
                                                <i className="fa fa-power-off"></i>
                                            </Button>
                                        </NavLink>
                                    </OverlayTrigger>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isLoggedIn: state.userLogin.isLoggedIn };
};

export default connect(mapStateToProps)(Header);
