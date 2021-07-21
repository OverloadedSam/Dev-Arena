import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

class Input extends Component {
    render() {
        const {
            label,
            idAndName,
            error,
            hint,
            wrapperElementClassName,
            ...rest
        } = this.props;

        return (
            <>
                <Col md={6} className={"my-2 " + wrapperElementClassName}>
                    <Form.Label
                        className="font-weight-bold  text-capitalize"
                        htmlFor={idAndName}
                    >
                        {label ? label : ""}
                    </Form.Label>
                    <Form.Control id={idAndName} name={idAndName} {...rest} />
                    {error && (
                        <Form.Text className="text-danger">{error}</Form.Text>
                    )}
                    {!error && hint ? (
                        <Form.Text className="font-weight-bold font-italic">
                            {hint}
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Col>
            </>
        );
    }
}

Input.defaultProps = {
    wrapperElementClassName: "",
    placeholder: "",
    type: "text",
    hint: null,
};

export default Input;
