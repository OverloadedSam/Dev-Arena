import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

class Header extends Component {
    render() {
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
                            <NavLink
                                to="/posts"
                                className="nav-link mx-auto navbar-item text-decoration-none"
                            >
                                <i className="ml-3 px-0 fa fa-newspaper-o"></i>{" "}
                                Posts
                            </NavLink>
                        </Nav>
                        <Nav className="ml-auto">
                            <NavLink
                                to="/login"
                                className="nav-link mx-auto navbar-item text-decoration-none"
                            >
                                <Button variant="danger">
                                    <i className="fa fa-sign-in"> </i> Log in
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
                            {/* <NavLink
                                to="/logout"
                                className="nav-link mx-auto navbar-item text-decoration-none"
                            >
                                <Button variant="warning">
                                    <i className="fa fa-power-off"> </i> Logout
                                </Button>
                            </NavLink> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;