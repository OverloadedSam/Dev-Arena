import React, { Component } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

class Select extends Component {
    render() {
        const { label, idAndName, error, hint, data, ...rest } = this.props;
        const { firstOption, options } = data;

        return (
            <>
                <Col md={6} className="my-2">
                    <Form.Label
                        className="font-weight-bold  text-capitalize"
                        htmlFor={idAndName}
                    >
                        {label ? label : ""}
                    </Form.Label>

                    <Form.Control
                        as="select"
                        id={idAndName}
                        name={idAndName}
                        {...rest}
                    >
                        {
                            <option value="">
                                {firstOption.text || firstOption}
                            </option>
                        }
                        {options.map((opt) => (
                            <option
                                key={opt.value || opt}
                                value={opt.value || opt}
                            >
                                {opt.text || opt}
                            </option>
                        ))}
                    </Form.Control>

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

Select.defaultProps = {
    placeholder: "",
    hint: null,
};

Select.propsType = {
    data: PropTypes.object.isRequired,
    idAndName: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default Select;
