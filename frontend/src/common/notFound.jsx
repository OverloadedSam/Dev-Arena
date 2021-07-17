import React, { Component } from "react";
import Image from "react-bootstrap/Image";

export class NotFound extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center flex-column py-4 not-found">
                <Image
                    src="/assets/images/notfound.png"
                    className="py-3 not-found-image"
                    alt="not found"
                />
                <h1 className="my-3 text-center text-danger">404</h1>
                <h1 className="text-center text-danger">Page Not Found</h1>
            </div>
        );
    }
}

export default NotFound;
