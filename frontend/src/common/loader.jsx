import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";

class Loader extends Component {
    render() {
        const height = this.props.height;
        const defaultStyle = { height: !height && "80vh" };

        return (
            <div
                style={defaultStyle}
                className="d-flex justify-content-center align-items-center flex-column"
            >
                <div className="mb-1">
                    <Spinner
                        animation="grow"
                        variant="danger"
                        className="mx-1"
                    />
                    <Spinner
                        animation="grow"
                        variant="success"
                        className="mx-1"
                    />
                </div>
                <div className="mb-1">
                    <Spinner animation="grow" variant="info" className="mx-1" />
                    <Spinner
                        animation="grow"
                        variant="warning"
                        className="mx-1"
                    />
                </div>
            </div>
        );
    }
}

export default Loader;
