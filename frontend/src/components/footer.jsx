import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <div className="bg-dark footer">
                <div className="d-flex justify-content-center align-items-center ">
                    <p className="text-light p-2 m-1">
                        &copy; Copyright{" "}
                        <Link className="text-light" to="/home">
                            Dev Arena
                        </Link>
                    </p>
                </div>{" "}
            </div>
        );
    }
}

export default Footer;
