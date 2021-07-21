import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Button from "./button";
import Select from "./select";

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

    validateData = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;

        let errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    };

    validateFieldValue = (field, value) => {
        const dataObj = { [field]: value };
        const schemaObj = { [field]: this.schema[field] };
        const { error } = Joi.validate(dataObj, schemaObj);

        return error ? error.details[0].message : null;
    };

    handleChange = (e) => {
        const { name: field, value } = e.currentTarget;
        let errors = this.state.errors;
        const data = this.state.data;

        const error = this.validateFieldValue(field, value);

        if (!error) delete errors[field];
        else errors[field] = error;
        data[field] = value;

        this.setState({ errors });
        this.setState({ data });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validateData();
        if (errors) return this.setState({ errors });

        this.performSubmit(e);
    };

    renderInput = (attributes) => {
        const { errors, data } = this.state;
        const { name, onChangeHandler, ...rest } = attributes;
        return (
            <Input
                idAndName={name}
                onChange={onChangeHandler || this.handleChange}
                error={errors[name]}
                isInvalid={errors[name] ? true : false}
                value={data[name]}
                {...rest}
            />
        );
    };

    renderSelect = (attributes) => {
        const { errors, data } = this.state;
        const { name, ...rest } = attributes;

        return (
            <Select
                idAndName={name}
                onChange={this.handleChange}
                error={errors[name]}
                isInvalid={errors[name] ? true : false}
                value={data[name]}
                {...rest}
            />
        );
    };

    renderButton = (attribute) => (
        <Button onClick={this.handleSubmit} {...attribute} />
    );
}

export default Form;
