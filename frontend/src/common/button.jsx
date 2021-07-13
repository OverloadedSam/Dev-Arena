import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import BootstrapButton from "react-bootstrap/Button";

export class Button extends Component {
    render() {
        const { text, colSize, ...rest } = this.props;
        return (
            <Col md={colSize}>
                <BootstrapButton {...rest}>{text}</BootstrapButton>
            </Col>
        );
    }
}

Button.defaultProps = {
    variant: "primary",
    size: "md",
    block: false,
    type: "submit",
    colSize: "6",
    className: "my-2",
};

export default Button;
